'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

/* Help urls */
Blockly.Msg.CODERBOT_MOVE_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Move";
Blockly.Msg.CODERBOT_CAMERA_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Camera";
Blockly.Msg.CODERBOT_SOUND_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sound";
Blockly.Msg.CODERBOT_SLEEP_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sleep";
Blockly.Msg.CODERBOT_SENSOR_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sensor";

/* Block's texts */
Blockly.Msg.CODERBOT_MOVE_FORWARD = "move forward";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "move backward";
Blockly.Msg.CODERBOT_TURN_LEFT = "turn left";
Blockly.Msg.CODERBOT_TURN_RIGHT = "turn right";
Blockly.Msg.CODERBOT_MOVE_STOP = "stop moving";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "move bot %1 at speed %2 for %3 second(s)";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED = "move bot (motion controled) for %1 centimeter(s)";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED = "turn bot (motion controled) for %1 degrees";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS = "motor control : left speed %1, right speed %2, for %3 second(s)";

Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT = "take picture";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING = "start recording";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING = "stop recording";

Blockly.Msg.CODERBOT_SOUND_SAY = "say %1";
Blockly.Msg.CODERBOT_SLEEP = "sleep %1 second(s)";

Blockly.Msg.CODERBOT_SENSOR_DETECT = "%1 found ?";
Blockly.Msg.CODERBOT_SENSOR_WHEN = "when %1 found, with : sensor";
Blockly.Msg.CODERBOT_SENSOR_WHEN_DO = "do %1";
Blockly.Msg.CODERBOT_SENSOR_WAIT = "wait for %1";

/* Tooltips texts */
Blockly.Msg.CODERBOT_MOVE_TOOLTIP = "move the bot %1";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED_TOOLTIP = "camera assisted move of the bot";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED_TOOLTIP = "camera assisted turn of the bot";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS_TOOLTIP = "control motor's speed independantly";
Blockly.Msg.CODERBOT_MOVE_STOP_TOOLTIP = "stop the bot";

Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "forward";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "backward";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "left";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "right";


Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT_TOOLTIP = "take a picture with the robot's camera";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING_TOOLTIP = "start recording a movie of the robot vision";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING_TOOLTIP = "stop recording a movie of the robot vision";

Blockly.Msg.CODERBOT_SOUND_SAY_TOOLTIP = "robot say anything";
Blockly.Msg.CODERBOT_SLEEP_TOOLTIP = "stop the program for a while";

Blockly.Msg.CODERBOT_SENSOR_DETECT_TOOLTIP = "get the sensor value (0 or 1)";
Blockly.Msg.CODERBOT_SENSOR_WHEN_TOOLTIP = "launch some commands when sensor's value change";
Blockly.Msg.CODERBOT_SENSOR_WAIT_TOOLTIP = "wait sensor's value to change";

Blockly.Msg.CODERBOT_SENSOR_TIP_FPS = "fps";
Blockly.Msg.CODERBOT_SENSOR_TIP_SQUARE = "square";
Blockly.Msg.CODERBOT_SENSOR_TIP_CIRCLE = "circle";
Blockly.Msg.CODERBOT_SENSOR_TIP_LIGHT = "light";
Blockly.Msg.CODERBOT_SENSOR_TIP_COLOR = "color";
Blockly.Msg.CODERBOT_SENSOR_TIP_MOTION = "motion";
Blockly.Msg.CODERBOT_SENSOR_TIP_FACE = "face";





/*
Blockly.Msg.CODERBOT_MOVE_FORWARD = "move forward";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "move backward";
Blockly.Msg.CODERBOT_MOVE_LEFT = "turn left";
Blockly.Msg.CODERBOT_MOVE_RIGHT = "turn right";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "move bot";
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE = "move bot (motion control)";
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN = "turn bot (motion control)";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR = "motor control";
Blockly.Msg.CODERBOT_MOVE_ADV_SPEED = "at speed"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_LEFT = "speed left"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_RIGHT = "speed right"
Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE = "for"
Blockly.Msg.CODERBOT_MOVE_MOTION_DIST = "distance"
Blockly.Msg.CODERBOT_MOVE_MOTION_ANGLE = "angle"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "forward"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "backward"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "right"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "left"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL= " at speed (0-100%) for time (seconds)"
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE_TIP = "move bot, using vision to control"
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN_TIP = "turn bot, using vision to control"
Blockly.Msg.CODERBOT_MOVE_STOP = "stop";
Blockly.Msg.CODERBOT_SAY = "say";
Blockly.Msg.CODERBOT_PHOTO_TAKE = "take photo";
Blockly.Msg.CODERBOT_VIDEO_REC = "video rec";
Blockly.Msg.CODERBOT_VIDEO_STOP = "video stop";
Blockly.Msg.CODERBOT_SLEEP = "sleep";
Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD = "path ahead";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE = "find line";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE = "find face";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL = "find signal";
Blockly.Msg.CODERBOT_SENSOR_FINDCODE = "find code";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_FIND = "find";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_COLOR = "from color";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_DIST = "distance";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_ANGLE = "angle";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_BOTH = "both";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_X = "x coord";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_Y = "y coord";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_SIZE = "size";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_ALL = "x, y, size (as list)";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO = "find logo";
*/
