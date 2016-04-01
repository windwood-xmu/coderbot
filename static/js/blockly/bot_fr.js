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
Blockly.Msg.CODERBOT_MOVE_FORWARD = "avancer";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "reculer";
Blockly.Msg.CODERBOT_TURN_LEFT = "tourner à gauche";
Blockly.Msg.CODERBOT_TURN_RIGHT = "tourner à droite";
Blockly.Msg.CODERBOT_MOVE_STOP = "arrêter le robot";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "déplacer le robot %1 avec une vitesse de %2 durant %3 seconde(s)";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED = "déplacer le robot d'une distance de %1 centimètre(s)";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED = "tourner le robot d'un angle de %1 degrès";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS = "faire tourner les moteurs : vitesse gauche %1, vitesse droite %2, durant %3 seconde(s)";

Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT = "prendre une photo";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING = "démarrer l'enregistrement vidéo";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING = "arrêter l'enregistrement vidéo";

Blockly.Msg.CODERBOT_SOUND_SAY = "dire %1";
Blockly.Msg.CODERBOT_SLEEP = "attendre %1 seconde(s)";

Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD = "chemin devant ?";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE = "trouver une ligne";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL = "trouver un signal";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE = "trouver un visage et retourner %1";
Blockly.Msg.CODERBOT_SENSOR_FINDCODE = "trouver un code";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR = "trouver %1 de cette couleur %2";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO = "trouver le logo";

/* Tooltips texts */
Blockly.Msg.CODERBOT_MOVE_TOOLTIP = "déplace le robot %1";
Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED_TOOLTIP = "effectue un déplacement du robot contrôlé par la caméra";
Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED_TOOLTIP = "effectue une rotation du robot contrôlée par la caméra";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS_TOOLTIP = "permet de faire tourner les moteurs de façon indépendante";
Blockly.Msg.CODERBOT_MOVE_STOP_TOOLTIP = "stoppe les moteurs du robot";

Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "en avant";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "en arrière";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "à gauche";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "à droite";


Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT_TOOLTIP = "prends une photo par la caméra du robot";
Blockly.Msg.CODERBOT_CAMERA_START_RECORDING_TOOLTIP = "lance l'enregistrement d'une vidéo de ce que voit le robot";
Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING_TOOLTIP = "arrête l'enregistrement de la vidéo de ce que voit le robot";

Blockly.Msg.CODERBOT_SOUND_SAY_TOOLTIP = "fait parler le robot";
Blockly.Msg.CODERBOT_SLEEP_TOOLTIP = "arrête le déroulement du programme temporairement";

Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD_TOOLTIP = "détecte si le chemin devant le robot est libre";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE_TOOLTIP = "détecte si une ligne se trouve devant le robot";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL_TOOLTIP = "détecte un signal devant le robot";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TOOLTIP = "détecte un visage devant le robot et renvoi des informations sur ce visage";
Blockly.Msg.CODERBOT_SENSOR_FINDCODE_TOOLTIP = "détecte un code devant le robot";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TOOLTIP = "détecte si une couleur se trouve devant le robot";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO_TOOLTIP = "détecte un logo devant le robot";

Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_X = "l'abscisse X";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_Y = "l'ordonnée Y";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_SIZE = "la taille";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_ALL = "x, y, taille (sous forme de liste)";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_DIST = "la distance";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_ANGLE = "l'angle";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_BOTH = "la distance et l'angle (sous forme de liste)";


/* Deprecated */
/* This will be removed later */
/*
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "reculer";
Blockly.Msg.CODERBOT_MOVE_LEFT = "tourner à gauche";
Blockly.Msg.CODERBOT_MOVE_RIGHT = "tourner à droite";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "déplacer le robot";
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE = "déplacer le robot (motion control)";
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN = "tourner le robot (motion control)";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR = "contrôler les moteurs :";
Blockly.Msg.CODERBOT_MOVE_ADV_SPEED = "vitesse";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_LEFT = "vitesse à gauche";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_RIGHT = "vitesse à droite";
Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE = "durant";
Blockly.Msg.CODERBOT_MOVE_MOTION_DIST = "distance";
Blockly.Msg.CODERBOT_MOVE_MOTION_ANGLE = "angle";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "en avant";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "en arrière";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "à droite";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "à gauche";
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL= " avec une vitesse (0-100%) durant (secondes)";
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE_TIP = "déplace le robot, en utilisant la caméra pour controller";
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN_TIP = "tourne le robot, en utilisant la caméra pour controller";
Blockly.Msg.CODERBOT_MOVE_STOP = "stop";
Blockly.Msg.CODERBOT_SAY = "dit";
Blockly.Msg.CODERBOT_PHOTO_TAKE = "prend une photo";
Blockly.Msg.CODERBOT_VIDEO_REC = "démarre l'enregistrement vidéo";
Blockly.Msg.CODERBOT_VIDEO_STOP = "arrête l'enregistrement vidéo";
Blockly.Msg.CODERBOT_SLEEP = "attend pendant";
Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD = "chemin devant";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE = "trouve la ligne";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE = "trouve un visage";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL = "trouve un signal";
Blockly.Msg.CODERBOT_SENSOR_FINDCODE = "trouve un code";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_FIND = "trouve";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_COLOR = "de cette couleur";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_DIST = "la distance";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_ANGLE = "l'angle";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_BOTH = "la distance et l'angle";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_X = "abscisse";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_Y = "ordonnée";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_SIZE = "taille";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_ALL = "x, y, taille (sous forme de liste)";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO = "trouve le logo";
*/
