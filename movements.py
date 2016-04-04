import sensors
import time

# Classes for movements by servos or motors
# All herited the MovementsControl super class


class MovementsControl(object):
    def __init__(self):
        self._is_moving = False
    def set(self, speed_left=100, speed_right=100, elapse=None):
        self._is_moving = True
    def stop(self):
        for pin in self._pins:
            pin.stop()
        self._is_moving = False

    def is_moving(self):
        return self._is_moving

    def move(self, speed=100, elapse=None):
        self.set(speed, speed, elapse)
    def turn(self, speed=100, elapse=None):
        self.set(speed, -speed, elapse)

    def forward(self, speed=100, elapse=None):
        self.move(speed, elapse)
    def backward(self, speed=100, elapse=None):
        self.move(-speed, elapse)
    def right(self, speed=100, elapse=None):
        self.turn(speed, elapse)
    def left(self, speed=100, elapse=None):
        self.turn(-speed, elapse)


# 360 degrees servos controller
class ServosControl(MovementsControl):
    def __init__(self, pin_left, pin_right):
        super(ServosControl, self).__init__()
        self._pins = [sensors.ServoOutput(pin_left), sensors.ServoOutput(pin_right)]

    def set(self, speed_left=100, speed_right=100, elapse=None):
        speed_left = -speed_left/2+50
        speed_right = speed_right/2+50
        self._is_moving = True
        map(lambda pin, speed: pin.set(percent=speed), self._pins, [speed_left, speed_right])
        if elapse:
            time.sleep(elapse)
            self.stop()

class MotorsControl(MovementsControl):
    def __init__(self, pin_enable, pin_left_forward, pin_left_backward, pin_right_forward, pin_right_backward):
        super(MotorsControl, self).__init__()
        pins = [pin_left_forward, pin_left_backward, pin_right_forward, pin_right_backward]
        self._pins = [sensors.PWMOutput(pin) for pin in pins]
        self._pin_enable = sensors.OutPut(pin_enable)
        self._is_moving = False

    def freq(self, value):
        for pin in self._pins: pin.freq(value)
    def range(self, value):
        for pin in self._pins: pin.range(value)

    def set(self, speed_left=100, speed_right=100, elapse=None):
        speeds = []
        for speed in [speed_left, speed_right]:
            if speed > 0:   speeds.extend([speed,0])
            elif speed < 0: speeds.extend([0,-speed])
            else:           speeds.extend([0,0])
        self._is_moving = True
        map(lambda pin, speed: pin.set(speed), self._pins, speeds)
        self._pin_enable.set()
        if elapse:
            time.sleep(elapse)
            self.stop()

    def stop(self):
        self._pin_enable.clear()
        super(MotorsControl, self).stop()

