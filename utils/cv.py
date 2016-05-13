import cv2
import time

def JPEGencode (frame):
    ret, jpeg = cv2.imencode('.jpg', frame.array)
    return jpeg.tostring()

def faceDetect(frame):
    if not hasattr(frame, 'cascade'): frame.cascade = cv2.CascadeClassifier ('haarcascade_frontalface.xml')
    gray = cv2.cvtColor(frame.array, cv2.COLOR_BGR2GRAY)
    frame.faces = frame.cascade.detectMultiScale(gray)

def drawFaces(frame):
    if hasattr(frame, 'faces'):
        faces = frame.faces
        for (x,y,w,h) in faces:
            cv2.rectangle(frame.array, (x,y), (x+w, y+h), (0,255,0), 2)
            #cv2.ellipse(frame.array, (x+w/2,y+h/2), (w/2,h/2), 0, 0, 360, (0,255,0), 2)

# TODO: Work to make this thread safe or ImageGrabber safe
# Actually, if more than one ImageGrabber launch this function,
# The FPS is shared by all the ImageGrabber Threads
start = time.time()
counter = 0
FPS = 0
def drawFPS(frame):
    global start, counter, FPS
    counter += 1
    step = time.time()
    if step-start > 1:
        FPS = counter / (step-start)
        start = step
        counter = 0
    #FPS = counter / (step-start)

    cv2.putText(frame.array, "%.2f fps" % FPS, (2,14), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255))



