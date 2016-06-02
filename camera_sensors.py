import threading
import camera
import numpy as np
import cv2
from time import time, sleep
from sensors import SensorInterface, ON, OFF, RISING_EDGE, FALLING_EDGE, EITHER_EDGE, INPUT

ALL_UPDATE = 3

def debug(self, frame):
    if not hasattr(self, 'debug'): return False
    debug = self.debug
    if debug is not None:
        frame.array = debug
        return True
    return False


# TODO:
#
# Add blocks to get sensors informations like items or coordinates
#
# Utiliser __enter__ et __exit__ pour initialiser les capteurs (surtout utile pour les capteurs de camera)
# remplace les methodes _start et _stop et permet d'avoir un compteur d'utilisation pour reellement arreter le thread du capteur ou non

class CameraSensor(SensorInterface):
    def __init__(self, stream, use=False, draw=None):
        self._mode = INPUT
        self.__state = np.array(None)
        #self._data = []

        # stream: camera.ImageGrabber object
        # TODO: Verify the type of object stream for assertion
        self._stream = stream
        self._drawStream = draw
        self.factor = 1

        self.__lock = threading.Lock()
        self.__event = threading.Event()
        self.__thread = threading.Thread(target=self._run)
        self.__callbacks = []
        self.__launched = False

        if draw is not None:
            self.factor = draw._size[0]/stream._size[0]
            #draw.addProcess(self._draw)
        if use:
            self._start()

    # start and stop camera sensor
    def _start(self):
        if not self.__launched:
            self.__launched = True
            self.__terminated = False
            self.__thread.start()
            self._stream.addProcess(self._process)
            if self._drawStream is not None:
                self._drawStream.addProcess(self._draw)
    def _stop(self):
        #if self._drawStream is not None:
        #    self._drawStream.delProcess(self._draw)
        #try: self._stream.delProcess(self._process)
        #except ValueError: pass
        if self.__launched:
            if self._drawStream is not None:
                self._drawStream.delProcess(self._draw)
            self._stream.delProcess(self._process)

            self.__terminated = True
            self.__thread.join()
            # Because a thread cannot be relaunched after safely stopped
            self.__thread = threading.Thread(target=self._run)
            self.__launched = False
        self.__state = np.array(None)

    def _run(self):
        while not self.__terminated:
            if self.__event.wait(0.2):
                try:
                    with self.__lock:
                        tick = int(time()*1000)
                        for edge, cb in self.__callbacks:
                            if edge == ALL_UPDATE or edge ^ self.__state.any(): cb(self)
                finally:
                    self.__event.clear()

    # Methods to overwrite to cutomize CameraSensor object
    def _process(self, frame):
        pass
    def _draw(self, frame):
        pass

    # Method to make state update and event call easy
    def _set(self, value):
        value = np.asarray(value)
        with self.__lock:
            #print value.shape, self.__state.shape
            if not np.array_equal(value, self.__state):
                self.__state = value
                self.__event.set()

    def read(self):
        with self.__lock:
            if np.array_equal(self.__state, np.array(None)): return None
            return self.__state.copy()

    def write(self, level):
        raise AttributeError('write not permitted on INPUT GPIO')
    def set(self):   self.write(ON)
    def clear(self): self.write(OFF)
    on = high = set
    off = low = clear

    # TODO: Perhaps use another Lock to be thread safe with this 2 functions
    def addProcess(self, function, edge=RISING_EDGE):
        if not self.__launched: self._start()
        self.__callbacks.append((edge, function))
    def delProcess(self, function, edge=RISING_EDGE):
        self.__callbacks.remove((edge, function))

    # TODO: Try to avoid the use of a subclass
    def wait(self, edge=RISING_EDGE, timeout=0):
        if not self.__launched: self._start()
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

############################################################################
# Lot of CameraSensors

class FPSSensor(CameraSensor):
    counter = 0
    start = time()
    position = (0,0)

    def _process(self, frame):
        self.counter += 1
        step = time()
        if step-self.start > 1:
            self._set(self.counter / (step - self.start))
            self.start = step
            self.counter = 0

    def _draw(self, frame):
        FPS = self.read()
        if FPS is None: return
        #dp = self._stream.dropped
        #dd = self._drawStream.dropped
        #(tw,th), baseline = cv2.getTextSize("%.2f fps %d|%d" % (FPS, dp, dd), cv2.FONT_HERSHEY_SIMPLEX, 0.3, 1)
        (tw,th), baseline = cv2.getTextSize("%.2f fps" % FPS, cv2.FONT_HERSHEY_SIMPLEX, 0.3, 1)
        x, y = self.position
        cv2.rectangle(frame.array, (x,y), (x+tw, y+th+baseline), (0,0,0), -1)
        #cv2.putText(frame.array, "%.2f fps %d|%d" % (FPS, dp, dd), (x,y+th), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255,255,255))
        cv2.putText(frame.array, "%.2f fps" % FPS, (x,y+th), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255,255,255))


# TODO: Threshold value can be a config field
class MotionSensor(CameraSensor):
    _avg = None

    def _process(self, frame):
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        if self._avg is None:
            self._avg = gray.astype('float')
            return
        cv2.accumulateWeighted(gray, self._avg, 0.5)
        delta = cv2.absdiff(gray, cv2.convertScaleAbs(self._avg))
        thresh = cv2.threshold(delta, 15, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        (cnts, _) = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = [cv2.boundingRect(c) for c in cnts if cv2.contourArea(c) >= 160]
        self._set(cnts)

    def _draw(self, frame):
        try: cnts = self.read()*self.factor
        except TypeError: return
        for (x,y,w,h) in cnts:
            cv2.rectangle(frame.array, (x,y), (x+w,y+h), (0,255,0), 1)
            (tw,th), baseline = cv2.getTextSize("motion", cv2.FONT_HERSHEY_SIMPLEX, 0.3, 1)
            cv2.rectangle(frame.array, (x,y), (x+tw, y+th+baseline), (0,255,0), -1)
            cv2.putText(frame.array, "motion", (x,y+th), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255,255,255))


class FaceSensor(CameraSensor):
    def _process(self, frame):
        # Attach cascadeClassifier to each frame because it's not thread safe (and there's a thread by frame processing)
        if not hasattr(frame, 'cascade'): frame.cascade = cv2.CascadeClassifier('haarcascade_frontalface.xml')

        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        faces = frame.cascade.detectMultiScale(gray)
        self._set(faces)

    def _draw(self, frame):
        try: faces = self.read()*self.factor
        except TypeError: return
        for (x,y,w,h) in faces:
            cv2.rectangle(frame.array, (x,y), (x+w, y+h), (0,255,0), 1)
            (tw,th), baseline = cv2.getTextSize("face", cv2.FONT_HERSHEY_SIMPLEX, 0.3, 1)
            cv2.rectangle(frame.array, (x,y), (x+tw, y+th+baseline), (0,255,0), -1)
            cv2.putText(frame.array, "face", (x,y+th), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255,255,255))


# TODO : Try it by day to work on
class EdgeSensor(CameraSensor):
    def _process(self, frame):
        def autoCanny(image, sigma=0.33):
            v = np.median(image)
            # apply automatic Canny edge detection using the computed median
            lower = int(max(0, (1.0 - sigma) * v))
            upper = int(min(255, (1.0 + sigma) * v))
            return cv2.Canny(image, lower, upper)

        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (7,7), 0)
        #thresh = cv2.threshold(blurred, 60, 255, cv2.THRESH_BINARY)[1]
        thresh = autoCanny(blurred)
        cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
        for c in cnts:
            cv2.drawContours(frame.array, [c], -1, (255,0,0))


class SquareSensor(CameraSensor):
    def _process(self, frame):
        # convert the frame to grayscale, blur it, and detect edges
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (7, 7), 0)
        edged = cv2.Canny(blurred, 50, 150)
        # find contours in the edge map
        (cnts, _) = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        # loop over the contours
        for c in cnts:
            # approximate the contour
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.01 * peri, True)

            # ensure that the approximated contour is "roughly" rectangular
            if len(approx) >= 4 and len(approx) <= 6:
                # compute the bounding box of the approximated contour and
                # use the bounding box to compute the aspect ratio
                (x, y, w, h) = cv2.boundingRect(approx)
                aspectRatio = w / float(h)

                # compute the solidity of the original contour
                area = cv2.contourArea(c)
                hullArea = cv2.contourArea(cv2.convexHull(c))
                solidity = area / float(hullArea)

                # compute whether or not the width and height, solidity, and
                # aspect ratio of the contour falls within appropriate bounds
                keepDims = w > 25 and h > 25
                keepSolidity = solidity > 0.9
                keepAspectRatio = aspectRatio >= 0.8 and aspectRatio <= 1.2

                # ensure that the contour passes all our tests
                if keepDims and keepSolidity and keepAspectRatio:
                    # draw an outline around the target and update the status
                    # text
                    cv2.drawContours(frame.array, [approx], -1, (0, 0, 255), 4)

                    # compute the center of the contour region and draw the
                    # crosshairs
                    M = cv2.moments(approx)
                    (cX, cY) = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
                    (startX, endX) = (int(cX - (w * 0.15)), int(cX + (w * 0.15)))
                    (startY, endY) = (int(cY - (h * 0.15)), int(cY + (h * 0.15)))
                    cv2.line(frame.array, (startX, cY), (endX, cY), (0, 0, 255), 3)
                    cv2.line(frame.array, (cX, startY), (cX, endY), (0, 0, 255), 3)


# TODO: Not working properly yet
class CircleSensor(CameraSensor):
    circles = []

    def _process(self, frame):
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.2, 100)
        if circles is not None:
            print circles
            circles = np.round(circles[0, :]).astype('int')
        else:
            circles = []
        self.circles = circles
        self._set(bool(len(circles)))

    def _draw(self, frame):
        circles = list(self.circles * self.factor)
        for (x,y,r) in circles:
            cv2.circle(frame.array, (x,y), r, (0,0,255), 1)
            cv2.rectangle(frame.array, (x-5,y-5), (x+5,y+5), (0,0,255), -1)


# TODO: maxval can be a config field
class LightSensor(CameraSensor):
    def _process(self, frame):
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        (minval, maxval, minpos, maxpos) = cv2.minMaxLoc(gray)
        if maxval > 240:
            self._set(maxpos)
        else:
            self._set(None)

    def _draw(self, frame):
        try: (x,y) = self.read() * self.factor
        except TypeError: return
        cv2.circle(frame.array, (x,y), 5, (0,255,0), 1)


# TODO: Color sensitivity (Hue +/- sensitivity) can be a config field
class ColorSensor(CameraSensor):
    color = None # (R,G,B) tuple
    _lower = None
    _upper = None
    _split = False

    def setColor(self, color):
        sensitivity = 5
        h,s,v = cv2.cvtColor(np.uint8([[color]]), cv2.COLOR_RGB2HSV)[0,0]
        if h < sensitivity or h > 180-sensitivity: self._split = True
        else: self._split = False
        self._lower = np.uint8(((180+h-sensitivity)%180, 50, 50))
        self._upper = np.uint8(((h+sensitivity)%180, 255, 255))
        self.color = color
        #print (h,s,v), self._lower, self._upper

    def _process(self, frame):
        if self.color is not None:
            hsv = cv2.cvtColor(frame.array, cv2.COLOR_BGR2HSV)
            if self._split:
                maskL = cv2.inRange(hsv, self._lower, np.uint8([0,255,255]))
                maskU = cv2.inRange(hsv, np.uint8([0,50,50]), self._upper)
                mask = maskL + maskU
            else:
                mask = cv2.inRange(hsv, self._lower, self._upper)
            #kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11,11))
            kernel = None
            mask = cv2.erode(mask, kernel, iterations=2)
            mask = cv2.dilate(mask, kernel, iterations=2)
            mask = cv2.GaussianBlur(mask, (3,3), 0)
            (cnts, _) = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
            cnts = map(cv2.boundingRect, cnts)
            self._set(cnts)

    def _draw(self, frame):
        try: cnts = self.read()*self.factor
        except TypeError: return
        for (x,y,w,h) in cnts:
            # Draw the bounding rectangle of the countour
            cv2.rectangle(frame.array, (x,y), (x+w,y+h), (0,255,0), 1)
            (tw,th), baseline = cv2.getTextSize("color", cv2.FONT_HERSHEY_SIMPLEX, 0.3, 1)
            cv2.rectangle(frame.array, (x,y), (x+tw, y+th+baseline), (0,255,0), -1)
            cv2.putText(frame.array, "color", (x,y+th), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255,255,255))


class FlowSensor(CameraSensor):
    _avg = None
    #flow = []
    _mask = None
    _previous = None
    _p0 = None
    _color = np.random.randint(0,255,(100,3))
    _warmup = True
    _lock = threading.Lock()

    def _process(self, frame):
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        if self._avg is None:
            self._avg = gray.astype('float')
            return
        cv2.accumulateWeighted(gray, self._avg, 0.5)
        delta = cv2.absdiff(gray, cv2.convertScaleAbs(self._avg))
        if self._warmup and cv2.countNonZero(delta) > 5000: return
        self._warmup = False
        if cv2.countNonZero(delta) < 5000: return
        if self._previous is None: self._previous = delta
        with self._lock:
            if self._p0 is None:
                self._p0 = cv2.goodFeaturesToTrack(delta, mask=None, maxCorners=100, qualityLevel=0.3, minDistance=7, blockSize=7)
                return
            p1, st, err = cv2.calcOpticalFlowPyrLK(self._previous, delta, self._p0, None, winSize=(15,15), maxLevel=2, criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))
            if p1 is None:
                self._mask = None
                self._p0 = cv2.goodFeaturesToTrack(delta, mask=None, maxCorners=100, qualityLevel=0.3, minDistance=7, blockSize=7)
                return

            # Select good points
            good_new = p1[st==1]
            good_old = self._p0[st==1]

            self._set(zip(good_new,good_old))

            self._previous = delta
            if len(p1) < 5:
                #self._mask = None
                self._p0 = cv2.goodFeaturesToTrack(delta, mask=None, maxCorners=100, qualityLevel=0.3, minDistance=7, blockSize=7)
            else:
                self._p0 = good_new.reshape(-1,1,2)

        #self._set(bool(len(self.flow)))

    def _draw(self, frame):
        #if debug(self, frame): return
        if self._mask is None: self._mask = np.zeros_like(frame.array)
        # draw the tracks
        try: vects = self.read()*self.factor
        except TypeError: return
        for i,(new,old) in enumerate(vects):
            a,b = new.ravel()
            c,d = old.ravel()
            cv2.line(self._mask, (a,b), (c,d), self._color[i].tolist(), 1)
            cv2.circle(frame.array, (a,b), 3, self._color[i].tolist(), -1)
        frame.array = cv2.add(frame.array,self._mask)


class DenseFlowSensor(CameraSensor):
    _prvs = None
    _hsv = None

    def _process(self, frame):
        if self._hsv is None:
            self._hsv = np.zeros_like(frame.array)
            self._hsv[...,1] = 255

        next = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        #next = cv2.GaussianBlur(next, (3,3), 0)
        if self._prvs is None:
            self._prvs = next
            return

        flow = cv2.calcOpticalFlowFarneback(self._prvs,next, 0.5, 3, 15, 3, 5, 1.2, 0)
        self._set(flow)

        self._prvs = next

    def _draw(self, frame):
        try: flow = self.read()*self.factor*10
        except TypeError: return
        (w,h,_,_) = cv2.mean(flow)
        (w,h) = (int(w),int(h))
        (y,x,_) = frame.array.shape
        (x,y) = (x/2, y/2)
        cv2.line(frame.array, (x,y), (x+w, y+h), (255,0,0), 1)
        return

        # Another way to display the flow
        mag, ang = cv2.cartToPolar(flow[...,0], flow[...,1])
        self._hsv[...,0] = ang[...,0]*180/np.pi/2
        self._hsv[...,2] = cv2.normalize(mag,None,0,255,cv2.NORM_MINMAX)
        #self._hsv[...,2] = cv2.normalize(mag,None,255,cv2.NORM_INF)
        frame.array = cv2.cvtColor(self._hsv,cv2.COLOR_HSV2BGR)



# TODO: Not working yet
class BarCodeSensor(CameraSensor):
    barcode = None
    debug = None

    def _process(self, frame):
        gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
        # compute the Scharr gradient magnitude representation of the images
        # in both the x and y direction
        gradX = cv2.Sobel(gray, ddepth=-1, dx=1, dy=0, ksize=3)
        gradY = cv2.Sobel(gray, ddepth=-1, dx=0, dy=1, ksize=3)
        # subtract the y-gradient from the x-gradient
        #gradX = abs(gradX)
        #gradY = abs(gradY)

        gradient = cv2.subtract(gradX, gradY)
        gradient = cv2.convertScaleAbs(gradient)
        self.debug = gradient
        # blur and threshold the image
        blurred = cv2.blur(gradient, (9, 9))
        (_, thresh) = cv2.threshold(blurred, 100, 255, cv2.THRESH_BINARY)
        # construct a closing kernel and apply it to the thresholded image
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 7))
        closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        # perform a series of erosions and dilations
        closed = cv2.erode(closed, None, iterations = 2)
        closed = cv2.dilate(closed, None, iterations = 5)
        # find the contours in the thresholded image, then sort the contours
        # by their area, keeping only the largest one
        (cnts, _) = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = sorted(cnts, key = cv2.contourArea, reverse = True)
        if len(cnts) > 0:
            c = cnts[0]
            # compute the rotated bounding box of the largest contour
            rect = cv2.minAreaRect(c)
            self.barcode = np.int0(cv2.cv.BoxPoints(rect))
        else:
            self.barcode = None

    def _draw(self, frame):
        if debug(self, frame): return
        code = self.barcode
        if code is not None:
            cv2.drawContours(frame.array, [code], -1, (0, 0, 255), 1)


# List of all working sensors
sensors = {
    'face'   : FaceSensor,
    'motion' : MotionSensor,
    'color'  : ColorSensor,
    'light'  : LightSensor,
    #'barcode': BarCodeSensor,
    #'square' : SquareSensor,
    #'circle' : CircleSensor,
    #'edge'   : EdgeSensor,
    'flow'   : DenseFlowSensor,
    'fps'    : FPSSensor
}


if __name__ == '__main__':
    def printFaces(sensor):
        print sensor.getFaces()

    cam = camera.Camera((1024,768), 30)
    SD = cam.getGrabber(threads=4, size=(320,240), port=1)
    LD = cam.getGrabber(threads=4, size=(160,120), port=2)

    # addProcess test
    faceSensor = FaceSensor(LD, draw=SD)
    faceSensor.addProcess(printFaces, EITHER_EDGE)
    sleep(2)

    # wait test
    print 'wait test'
    sleep(2)
    print faceSensor.wait(timeout=2),
    print 'returned'

    # stop cleanly all threads
    faceSensor._stop()
    cam.close()

