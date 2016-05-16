import threading
import camera
import cv2
from time import time, sleep
from sensors import SensorInterface, ON, OFF, RISING_EDGE, FALLING_EDGE, EITHER_EDGE, INPUT

class CameraSensor(SensorInterface):
    def __init__(self, stream, use=False):
        # stream: camera.ImageGrabber object
        # TODO: Verify the type of object stream for assertion
        self._stream = stream
        self._state = False
        self._lock = threading.Lock()
        self._event = threading.Event()
        self._thread = threading.Thread(target=self._run)

        self._mode = INPUT
        self._callbacks = []
        self._launched = False
        if use:
            self._init()

    # start and stop camera sensor
    def _init(self):
        self._launched = True
        self._terminated = False
        self._thread.start()
        self._stream.addProcess(self._process)
    def _del(self):
        try: self._stream.delProcess(self._process)
        except ValueError: pass
        self._terminated = True
        self._thread.join()
        self._state = False
        self._launched = False

    def _run(self):
        while not self._terminated:
            if self._event.wait(0.2):
                try:
                    with self._lock:
                        tick = int(time()*1000)
                        for edge, cb in self._callbacks:
                            if edge ^ self._state: cb(self)
                finally:
                    self._event.clear()

    # Method to overwrite to cutomize CameraSensor object
    def _process(self, frame):
        pass

    # Method to make state update easy
    def _set(self, value):
        changed = value ^ self._state
        if changed:
            with self._lock:
                self._state = value
                self._event.set()

    def read(self):
        return self._state

    def write(self, level):
        raise AttributeError('write not permitted on INPUT GPIO')
    def set(self):   self.write(ON)
    def clear(self): self.write(OFF)
    on = high = set
    off = low = clear

    # TODO: Perhaps use another Lock to be thread safe with this 2 functions
    def addProcess(self, function, edge=RISING_EDGE):
        if not self._launched: self._init()
        self._callbacks.append((edge, function))
    def delProcess(self, function, edge=RISING_EDGE):
        self._callbacks.remove((edge, function))

    def wait(self, edge=RISING_EDGE, timeout=0):
        if not self._launched: self._init()
        class _wait:
            def __init__(self, this):
                start = time()
                self.triggered = False
                this.addProcess(self.wait, edge)
                while (not self.triggered) and (not timeout or ((time()-start) < timeout)):
                    sleep(0.05)
                this.delProcess(self.wait, edge)
            def wait(self, sensor):
                self.triggered = True
        return _wait(self).triggered


class FaceSensor(CameraSensor):
    faces = []

    def _process(self, frame):
        # Attach cascadeClassifier to each frame because it's not thread safe (and there's a thread by frame processing)
        if not hasattr(frame, 'cascade'): frame.cascade = cv2.CascadeClassifier('haarcascade_frontalface.xml')

        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        faces = frame.cascade.detectMultiScale(gray)
        # TODO: Probably not thread safe
        # self.faces is used in other threads by program's blocks
        self.faces = faces
        self._set(bool(len(faces)))

    def getFaces(self):
        return list(self.faces)



if __name__ == '__main__':
    def printFaces(sensor):
        print sensor.getFaces()

    cam = camera.Camera((1024,768), 30)
    SD = cam.getGrabber(threads=4, size=(320,240), port=1)
    LD = cam.getGrabber(threads=4, size=(160,120), port=2)

    # addProcess test
    faceSensor = FaceSensor(LD)
    faceSensor.addProcess(printFaces, EITHER_EDGE)
    sleep(10)

    # wait test
    print 'wait test'
    sleep(2)
    print faceSensor.wait(timeout=2),
    print 'returned'

    # stop cleanly all threads
    faceSensor._del()
    cam.close()

