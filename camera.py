import time, sys
import threading
import picamera
import picamera.array
import cv2
from utils.POO import SingletonDecorator as Singleton
from os.path import join as pathJoin

RECORD_PATH = 'DCIM'

# TODO : Perhaps use the Threading.Queue object insteed
# Create a pool of image processors
class Pool(object):
    def __init__(self):
        self._lock = threading.Lock()
        self._pool = []
    def put(self, item):
        with self._lock:
            self._pool.append(item)
    def get(self):
        with self._lock:
            if len(self._pool) > 1:
                return self._pool.pop()
            else:
                return None
    def remove(self, item):
        with self._lock:
            try: self._pool.remove(item)
            except ValueError: pass

class IndexedPool(Pool):
    def get(self, index=None):
        if index is None: index = 0
        with self._lock:
            if len(self._pool) > index:
                return self._pool[index]
            else:
                return None
    def pop(self):
        return super(IndexedPool, self).get()

    def __len__(self):
        with self._lock:
            return len(self._pool)


# Implement Pool
class ImageProcessor(threading.Thread):
    _pool = Pool()
    #_finished = Pool()
    def __init__(self):
        super(ImageProcessor, self).__init__()
        self._terminated = False
        self._event = threading.Event()
        self._frame = None
        self._analysisHook = None
        self.start()

    def run(self):
        self.put(self)
        while not self._terminated:
            # Wait for an image to be analysis
            if self._event.wait(1):
                try:
                    #self._frame.seek(0)
                    if self._analysisHook:
                        self._analysisHook(self._frame)
                        self._analysisHook = None
                finally:
                    self._frame = None
                    # Reset the frame and event
                    #self._frame.truncate(0)
                    self._event.clear()
                    # Return ourselves to the pool
                    self.put(self)

    def process(self, frame, analysis=None):
        self._frame = frame
        self._analysisHook = analysis
        self._event.set()

    def shutdown(self):
        self._terminated = True
        self.join()
        # Normally, when the thread is stopped, it's after an analysis,
        # so the ImageProcessor instance is in _finished pool, not in _ready pool.
        #self.removeReadyProcessor(self)
        self.remove(self)

    @classmethod
    def get(cls):
        return cls._pool.get()
    @classmethod
    def put(cls, item):
        cls._pool.put(item)
    @classmethod
    def remove(cls, item):
        cls._pool.remove(item)

class ImageGrabber(threading.Thread):
    def __init__(self, camera, size=None, port=0, threads=0, frames=None):
        super(ImageGrabber, self).__init__()
        if frames is None: frames = threads
        if threads:
            if frames < threads: raise ValueError('number of frames must be greater or equal than number of threads')
        self._terminated = False

        self._camera = camera
        self._size = size
        self._port = port

        self.counter = 0
        self.dropped = 0

        self._lock = threading.Lock()
        self._analysisHooks = []

        self.threads = []
        for i in range(threads):
            p = ImageProcessor()
            self.threads.append(p)

        # Create two frame more than ImageProcessor's threads
        # to get the last frames at all time accessible
        # TODO: Utiliser un pool et un verrou pour les frames precedentes
        # avec les methodes d'acces et de recopie afin d'etre thread safe
        # et eviter les erreurs de segmentation.
        # Une possibilite est de ne garder QUE l'attribut array de l'objet
        # car il est recree a chaque traitement d'image. Du coup pas de pointeur nulle.

        self._frames = Pool()
        #self._readyFrames = Pool()
        #self._waitFrames = IndexedPool()
        self.frame = None
        self.previous_frame = None
        for i in range(frames):
            f = picamera.array.PiRGBArray(camera, size)
            f.lock = threading.Lock()
            self._frames.put(f)

        self.start()

    def run(self):
        self._camera.capture_sequence(self._getNextImageProcessor(), 'bgr', resize=self._size, use_video_port=True, splitter_port=self._port)

    def addProcess(self, callback):
        with self._lock:
            self._analysisHooks.append(callback)
    def delProcess(self, callback):
        with self._lock:
            self._analysisHooks.remove(callback)
    def process(self, frame):
        with self._lock:
            processes = list(self._analysisHooks)
        with frame.lock:
            for p in processes:
                p(frame)
        # When all image processes are done, return frame to the pool
        #frame.truncate(0)
        #if self.previous_frame is not None: self._frames.put(self.previous_frame)
        #self.previous_frame = self.frame
        #if self.frame is not None: self._frames.put(self.frame)
        #self.frame = frame
        self.frame = frame
        self._frames.put(frame)

    def _getNextImageProcessor(self):
        while not self._terminated:
            frame = self._frames.get()
            if frame:
                with frame.lock:
                    frame.truncate(0)
                    yield frame

                processor = ImageProcessor.get()
                if processor:
                    processor.process(frame, self.process)
                    self.counter += 1
                else:
                    # When the processes pool is starved, wait a while for it to refill
                    self.dropped += 1
                    #frame.truncate(0)
                    self._frames.put(frame)
                    time.sleep(0.01)
            else:
                # When the frames pool is starved, wait a while for it to refill
                time.sleep(0.01)

    def shutdown(self):
        self._terminated = True
        self.join()
        while self.threads:
            self.threads.pop().shutdown()

class Camera(object):
    ImageGrabberClass = ImageGrabber
    def __init__(self, resolution=None, framerate=None):
        self._camera = picamera.PiCamera()
        if resolution: self._camera.resolution = resolution
        if framerate: self._camera.framerate = framerate
        self._grabbers = []
        self._DCIMpath = ""
        self._recording = {}
    def getGrabber(self, size=None, port=0, threads=0, frames=None):
        grabber = Camera.ImageGrabberClass(self._camera, size, port, threads, frames)
        self._grabbers.append(grabber)
        return grabber
    def close(self):
        for grabber in self._grabbers:
            grabber.shutdown()
        self._camera.close()

    def setDCIMpath(self, path):
        self._DCIMpath = path
    def _getDCIM_next(self):
        from os import listdir
        from os.path import isfile, join, splitext
        pics = [f for f in listdir(self._DCIMpath) if isfile(join(self._DCIMpath, f)) and splitext(f)[1].lower() in ['.jpg', '.h264'] and f[:3] in ['IMG', 'MOV']]
        pics.sort()
        if pics:
            i = int(splitext(pics[-1])[0][3:]) + 1
        else:
            i = 1
        return i

    def capture(self, filename=None, size=None, port=0):
        if filename is None: filename = "IMG%04d.jpg" % self._getDCIM_next()
        self._camera.capture(pathJoin(self._DCIMpath, filename), resize=size, use_video_port=True, splitter_port=port)
    def start_recording(self, filename=None, size=None, port=1):
        if filename is None: filename = "IMG%04d.h264" % self._getDCIM_next()
        self._recording[port] = True
        self._camera.start_recording(pathJoin(self._DCIMpath, filename), resize=size, splitter_port=port)
    def stop_recording(self, port=1):
        if (port in self._recording and self._recording[port]):
            self._camera.stop_recording(splitter_port=port)
            self._recording[port] = False
    def split_recording(self, filename=None, port=1):
        if filename is None: filename = "IMG%04d.h264" % self._getDCIM_next()
        self._camera.split_recording(pathJoin(self._DCIMpath, filename), splitter_port=port)


if __name__ == '__main__':
    hog = cv2.HOGDescriptor()
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

    def faceDetect(frame):
        # make a copy for each frames because CascadeClassifier struct is not thread safe
        if not hasattr(frame, 'cascade'): frame.cascade = cv2.CascadeClassifier ('haarcascade_frontalface.xml')
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        frame.faces = faces = frame.cascade.detectMultiScale(gray)
        #for (x,y,w,h) in faces:
        #    cv2.rectangle(frame.array, (x,y), (x+w, y+h), (0,255,0), 2)
    def personDetect(frame):
        frame.persons = persons = hog.detect(frame)
        for (x,y,w,h) in persons:
            cv2.rectangle(frame.array, (x,y), (x+w, y+h), (0,255,0), 2)
    def draw(frame):
        try:
            faces = LD.frame.faces
            for (x,y,w,h) in faces:
                cv2.rectangle(frame.array, (x,y), (x+w, y+h), (255,0,0), 2)
        except: pass

    cam = Camera((1024,768), 30)
    start = time.time()
    SD = cam.getGrabber(threads=4, size=(320,240), port=1)
    LD = cam.getGrabber(threads=4, size=(160,120), port=2)
    LD.addProcess(faceDetect)
    SD.addProcess(draw)
    time.sleep(10)

    finish = time.time()
    cam.close()

    print "Analysed SD: %d frames in %d seconds at %.2f fps, Dropped SD: %d frames" % (SD.counter, finish-start, SD.counter/(finish-start), SD.dropped)
    print "Analysed LD: %d frames in %d seconds at %.2f fps, Dropped LD: %d frames" % (LD.counter, finish-start, LD.counter/(finish-start), LD.dropped)

