import time
import pigpio
from utils.POO import SingletonDecorator as Singleton

OFF = LOW = CLEAR = pigpio.OFF
ON = HIGH = SET = pigpio.ON

RISING_EDGE = pigpio.RISING_EDGE
FALLING_EDGE = pigpio.FALLING_EDGE
EITHER_EDGE = pigpio.EITHER_EDGE

INPUT = pigpio.INPUT
OUTPUT = pigpio.OUTPUT


# TODO :
#
# Donner acces a la liste des GPIOs libres
#
# Creer un decorateur ou une classe remplacant un circuit anti-rebonds
#
# Faire des blocks d'acces pour initialiser et utiliser des capteurs additionnels
#  - set <variableName> to [init <Input|Output|PWM|Servo> on pin <0>: return object]
#    voir wyliodrin (try without create account, and start a new project)

@Singleton
class PIGPIO(object):
    #FreePINs = []
    def __init__(self):
        # Avoid reinitialisation in case of multiple call
        if hasattr(self, '_pi') and self._pi: return
        self._pi = pigpio.pi()
    def __del__(self):
        self._pi.stop()
        self._pi = None

    def __getattr__(self, attr):
        return getattr(self._pi, attr)


class SensorInterface(object):
    def read(self): pass
    def write(self, level): pass
    def set(self):   self.write(ON)
    def clear(self): self.write(OFF)
    on = high = set
    off = low = clear
    def addProcess(self, function, edge=RISING_EDGE): pass
    def delProcess(self, function): pass
    def wait(self, level, timeout=0): pass


class Sensor(SensorInterface):
    def __init__(self, pin, mode=INPUT):
        self._mode = mode
        self._pi = PIGPIO()
        #self._pin = self._pi.get(pin)
        self._pin = pin
        self._callbacks = {}
        self._pi.set_mode(pin, mode)
    #def __del__(self):
    #    self._pi.put(self._pin)
    def read(self):
        return self._pi.read(self._pin)
    def write(self, level):
        if self._mode == INPUT:
            raise AttributeError('write not permitted on INPUT GPIO')
        self._pi.write(self._pin, level)

    def set(self):   self.write(ON)
    def clear(self): self.write(OFF)
    on = high = set
    off = low = clear

    def addProcess(self, function, edge=RISING_EDGE):
        self._callbacks[function] = self._pi.callback(self._pin, edge, lambda p,l,t: function(self))
    def delProcess(self, function):
        self._callbacks[function].cancel()
        self._callbacks.remove(function)

    def wait(self, level=RISING_EDGE, timeout=0):
        class _wait(pigpio._callback):
            def __init__(this, pin, edge, timeout=0):
                start = time.time()
                this.triggered = False
                pigpio._callback.__init__(this, self._pi._notify, pin, edge, this.trigger)
                while (not this.triggered) and (not timeout or ((time.time()-start) < timeout)):
                    time.sleep(0.05)
                this.cancel()
            def trigger(this, pin, level, tick):
                this.triggered = True
        return _wait(self._pin, level, timeout).triggered

class Input(Sensor):
    def __init__(self, pin):
        super(Input, self).__init__(pin, INPUT)
class Output(Sensor):
    def __init__(self, pin):
        super(Output, self).__init__(pin, OUTPUT)
        self.clear()

class PWMOutput(Output):
    def __init__(self, pin, freq=100, range=100):
        super(PWMOutput, self).__init__(pin)
        self._pi.set_PWM_frequency(pin, freq)
        self._pi.set_PWM_range(pin, range)
        self.stop()
    def set(self, value):
        self._pi.set_PWM_dutycycle(self._pin, value)
    def freq(self, value):
        self._pi.set_PWM_frequency(self._pin, value)
    def range(self, value):
        self._pi.set_PWM_range(self._pin, value)
    def stop(self):
        self.clear()

# Servo is like PWM but
# - frequency is always 50Hz,
# - pulsewidth is always between 1ms and 2ms
# Exceptions are raised to protect servos when parameters are wrong
class ServoOutput(Output):
    def __init__(self, pin, min=1000, max=2000):
        super(ServoOutput, self).__init__(pin)
        if min<500 or max>2500:
            raise ValueError('min and max values can be exceed range [500:2500]')
        if min>max:
            raise ValueError('max must be greater than min')
        self._min = min
        self._max = max
        self.stop()
    def set(self, value=None, percent=None):
        # Value is in milliseconds
        if value is None and percent is None:
            raise ValueError('value or percent must be set')
        if value is not None and percent is not None:
            raise ValueError('only one value or percent must be set')
        if percent and (percent<0 or percent>100):
            raise ValueError('percent must be in range [0:100]')
        if value is None:
            value = (self._max-self._min)*percent/100 + self._min
        self._pi.set_servo_pulsewidth(self._pin, value)
    def stop(self):
        self._pi.set_servo_pulsewidth(self._pin, 0)

# TODO:
# Creer un decorateur ou une classe remplacant un circuit anti-rebonds pour la classe Input






if __name__ == '__main__':
    def printState(sensor):
        print sensor.read()

    def test():
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_UP)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_DOWN)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_UP)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_DOWN)
        time.sleep(10)
        pi.set_pull_up_down(17, pigpio.PUD_UP)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_DOWN)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_UP)
        time.sleep(1)
        pi.set_pull_up_down(17, pigpio.PUD_DOWN)

    pi = PIGPIO()
    from threading import Thread
    Thread(target=test).start()

    s = Input(17)
    s.addProcess(printState, EITHER_EDGE)
    time.sleep(6)
    print 'wait test'
    print s.wait(timeout=2),
    print 'returned'

    import sys
    sys.exit()


    PIN_LEFT = 25
    PIN_RIGHT = 4
    pins = [ServoOutput(PIN_LEFT), ServoOutput(PIN_RIGHT)]

    def stop():
        for pin in pins:
            pin.stop()

    def move(speed_left=100, speed_right=100):
        speed_left = -speed_left/2+50
        speed_right = speed_right/2+50
        pins[0].set(percent=speed_left)
        pins[1].set(percent=speed_right)

    for s in range(-100, 101, 10):
        print 'speed:', s
        move(s, s)
        time.sleep(1)
    stop()

