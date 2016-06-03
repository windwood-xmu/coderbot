import camera_sensors
import camera
import sensors
import movements
import sound
from utils.POO import SingletonDecorator as Singleton
from config import MultifileConfig as Config


@Singleton
class CoderBot(object):
    def __init__(self):
        # Avoid reinitialisation in case of multiple call
        if hasattr(self, '_init_complete') and self._init_complete: return

        # Splitter ports are for :
        # 0 - Capture full size images (default resolution)
        # 1 - Recording full size video (without opencv processing drawn)
        # 2 - Image processing for the first resolution
        # 3 - Image processing for the second resolution
        resolutions = Config().get('camera_resolutions', {'LD': (160,120), 'SD':(320,240), 'default':(1024,768)})
        self.camera = camera.Camera(resolutions['default'], Config().get('camera_framerate', 30))
        self.streamers = {}
        definitions = [r for r in resolutions.keys() if r <> 'default']
        for i, definition in enumerate(definitions, start=2):
            self.streamers[definition] = self.camera.getGrabber(threads=4, size=resolutions[definition], port=i)
        self._init_complete = True

        self.sensors = {}
        for sensor, klass in camera_sensors.sensors.iteritems():
            self.sensors[sensor] = klass(self.streamers['LD'], draw=self.streamers['SD'])
        self.sensors['color'].setColor((51,153,153))
        self.sensors['color'].setColor((162,161,105))
        self.sensors['light']._start()
        self.sensors['fps']._start()

        if Config().get('use_servos', True):
            #self.motors = movements.ServosControl(Config().get('pin_servo_left', 25), Config().get('pin_servo_right', 4))
            self.motors = movements.ServosMotionControlled(self.sensors['flow'], Config().get('pin_servo_left', 25), Config().get('pin_servo_right', 4))
        else:
            self.motors = movements.MotorsControl(Config().get('pin_enable_motor', 22),
                Config().get('pin_motor_left_forward', 25), Config().get('pin_motor_left_backward', 24),
                Config().get('pin_motor_right_forward', 4), Config().get('pin_motor_right_backward', 17))
            self.motors.freq(Config().get('PWM_frequency', 100))
        self.sound = sound.Sound()
        if Config().get('useMbrola', False): self.sound.useMbrola()

    def shutdown(self):
        self._init_complete = False
        self.motors.stop()
        for sensor in self.sensors.itervalues():
            try: sensor._stop()
            except AttributeError: pass
        self.camera.close()

    def run_demo(self, during=60):
        import time, sys, cv2
        from utils.cv import faceDetect

        faces = []
        self.streamers['LD'].addProcess(faceDetect)

        start = time.time()
        while time.time() - start < during:
            if hasattr(self.streamers['LD'].frame, 'faces'): faces = self.streamers['LD'].frame.faces
            if len(faces):
                (x,y,w,h) = faces[0]
                if x+w/2 < 40:
                    print '\rleft  ',
                    self.motors.left(25)
                elif x+w/2 > 120:
                    print '\rright ',
                    self.motors.right(25)
                else:
                    print '\rstop  ',
                    self.motors.stop()
            else:
                print '\rsearch',
                self.motors.left(25)
            sys.stdout.flush()
            time.sleep(0.05)

if __name__ == '__main__':
    bot = CoderBot()
    bot.sound.useMbrola()
    bot.sound.language('fr')
    try:
        bot.run_demo()
    except KeyboardInterrupt:
        pass
    except:
        raise
    finally:
        bot.shutdown()

