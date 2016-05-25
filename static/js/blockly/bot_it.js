'use strict';

goog.provide('Blockly.Msg.it');

goog.require('Blockly.Msg');

/* Help urls */
Blockly.Msg.CODERBOT_MOVE_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Move";
Blockly.Msg.CODERBOT_CAMERA_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Camera";
Blockly.Msg.CODERBOT_SOUND_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sound";
Blockly.Msg.CODERBOT_SLEEP_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sleep";
Blockly.Msg.CODERBOT_SENSOR_HELPURL = "https://github.com/CoderBotOrg/coderbot/wiki/help_Sensor";

/* Block's texts */
Blockly.Msg.CODERBOT_MOVE_FORWARD = "muovi avanti";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "muovi indietro";
Blockly.Msg.CODERBOT_TURN_LEFT = "gira a sinistra";
Blockly.Msg.CODERBOT_TURN_RIGHT = "gira a destra";
Blockly.Msg.CODERBOT_MOVE_STOP = "fermati";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "spostare bot %1 a velocità %2 per %3 secondi";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED = "spostare bot (movimento controllato) per %1 centimetro";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED = "girare bot (movimento controllato) per il %1 °";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS = "controllo del motore : Velocità di sinistra %1 , velocità giusta %2 , per %3 secondi";

Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT = "scatta foto";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING = "registra video";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING = "stop video";

Blockly.Msg.CODERBOT_SOUND_SAY = "dire %1";
Blockly.Msg.CODERBOT_SLEEP = "attendi %1 secondi";

Blockly.Msg.CODERBOT_SENSOR_DETECT = "%1 trovati ?";
Blockly.Msg.CODERBOT_SENSOR_WHEN = "quando %1 trovato, con : sensor";
Blockly.Msg.CODERBOT_SENSOR_WHEN_DO = "fare %1";
Blockly.Msg.CODERBOT_SENSOR_WAIT = "aspettare %1";

/* Tooltips texts */
Blockly.Msg.CODERBOT_MOVE_TOOLTIP = "move the bot %1";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED_TOOLTIP = "camera assisted move of the bot";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED_TOOLTIP = "camera assisted turn of the bot";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS_TOOLTIP = "control motor's speed independantly";
Blockly.Msg.CODERBOT_MOVE_STOP_TOOLTIP = "stop the bot";

Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "avanti";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "indietro";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "sinistra";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "destra";


Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT_TOOLTIP = "take a picture with the robot's camera";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING_TOOLTIP = "start recording a movie of the robot vision";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING_TOOLTIP = "stop recording a movie of the robot vision";

Blockly.Msg.CODERBOT_SOUND_SAY_TOOLTIP = "robot say anything";
Blockly.Msg.CODERBOT_SLEEP_TOOLTIP = "stop the program for a while";

Blockly.Msg.CODERBOT_SENSOR_DETECT_TOOLTIP = "get the sensor value (0 or 1)";
Blockly.Msg.CODERBOT_SENSOR_WHEN_TOOLTIP = "launch some commands when sensor's value change";
Blockly.Msg.CODERBOT_SENSOR_WAIT_TOOLTIP = "wait sensor's value to change";

Blockly.Msg.CODERBOT_SENSOR_TIP_FPS = "fps";
Blockly.Msg.CODERBOT_SENSOR_TIP_SQUARE = "piazza";
Blockly.Msg.CODERBOT_SENSOR_TIP_CIRCLE = "cerchio";
Blockly.Msg.CODERBOT_SENSOR_TIP_LIGHT = "leggero";
Blockly.Msg.CODERBOT_SENSOR_TIP_COLOR = "colore";
Blockly.Msg.CODERBOT_SENSOR_TIP_MOTION = "movimento";
Blockly.Msg.CODERBOT_SENSOR_TIP_FACE = "faccia";



/*
Blockly.Msg.CODERBOT_MOVE_FORWARD = "muovi avanti";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "muovi indietro";
Blockly.Msg.CODERBOT_MOVE_LEFT = "gira a sinistra";
Blockly.Msg.CODERBOT_MOVE_RIGHT = "gira a destra";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "muovi bot";
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE = "muovi bot (motion)";
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN = "gira bot (motion)";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR = "avvia motori";
Blockly.Msg.CODERBOT_MOVE_ADV_SPEED = "a velocità"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_LEFT = "velocità sinistra"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_RIGHT = "velocità destra"
Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE = "per"
Blockly.Msg.CODERBOT_MOVE_MOTION_DIST = "distanza"
Blockly.Msg.CODERBOT_MOVE_MOTION_ANGLE = "angolo"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "avanti"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "indietro"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "destra"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "sinistra"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL= " a velocità (0-100%) per tempo (secondi)"
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE_TIP = "muovi bot, usando la camera per il posizionamento"
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN_TIP = "gira il bot, usando la camera per il posizionamento"
Blockly.Msg.CODERBOT_MOVE_STOP = "stop";
Blockly.Msg.CODERBOT_SAY = "dire";
Blockly.Msg.CODERBOT_PHOTO_TAKE = "scatta foto";
Blockly.Msg.CODERBOT_VIDEO_REC = "registra video";
Blockly.Msg.CODERBOT_VIDEO_STOP = "stop video";
Blockly.Msg.CODERBOT_SLEEP = "attendi";
Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD = "spazio libero";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE = "trova linea";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE = "trova faccia";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL = "trova segnale";
Blockly.Msg.CODERBOT_SENSOR_FINDCODE = "trova codice";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_FIND = "trova";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_COLOR = "da colore";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_DIST = "distanza";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_ANGLE = "angolo";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_BOTH = "entrambi";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_X = "x (ascissa)";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_Y = "y (ordinata)";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_SIZE = "dimensione";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_ALL = "x, y, dimensione (come lista)";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO = "trova logo";
*/
