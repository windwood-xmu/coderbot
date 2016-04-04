'use strict';

//Blockly.HSV_SATURATION=.99;
//Blockly.HSV_VALUE=.99;

// Extensions to Blockly's JavaScript and Python generators.

/****************************************************/
/*                 Python generator                 */
/****************************************************/

Blockly.Python['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.Python.valueToCode(block, 'TEXT',
    Blockly.Python.ORDER_NONE) || '\'\'';
  return 'get_cam().set_text(' + argument0 + ')\n';
};

Blockly.Python['coderbot_repeat'] = function(block) {
  // Repeat n times (internal number).
  var repeats = parseInt(block.getFieldValue('TIMES'), 10);
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
    Blockly.Python.LOOP_PASS;
  var loopVar = Blockly.Python.variableDB_.getDistinctName(
    'count', Blockly.Variables.NAME_TYPE);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
};

Blockly.Python['coderbot_moveForward'] = function(block) {
  // Generate Python for moving forward.
  return 'coderbot.motors.forward(speed=config.get("default_speed_move", 100), elapse=config.get("default_elapse", 1))\n';
};

Blockly.Python['coderbot_moveBackward'] = function(block) {
  // Generate Python for moving forward.
  return 'coderbot.motors.backward(speed=config.get("default_speed_move", 100), elapse=config.get("default_elapse", 1))\n';
};

Blockly.Python['coderbot_turnLeft'] = function(block) {
  // Generate Python for turning left.
  return 'coderbot.motors.left(speed=config.get("default_speed_turn", 100), elapse=config.get("default_elapse", 1))\n';
};

Blockly.Python['coderbot_turnRight'] = function(block) {
  // Generate Python for turning left or right.
  return 'coderbot.motors.right(speed=config.get("default_speed_turn", 100), elapse=config.get("default_elapse", 1))\n';
};

Blockly.Python['coderbot_say'] = function(block) {
  // Generate Python for turning left or right.
  var text = Blockly.Python.valueToCode(block, 'TEXT',
    Blockly.Python.ORDER_NONE) || '\'\'';
  return 'coderbot.sound.say(' + text + ')\n';
};

Blockly.Python['coderbot_sleep'] = function(block) {
  // Generate Python for sleeping.
  
  var elapse = Blockly.Python.valueToCode(block, 'ELAPSE',
    Blockly.Python.ORDER_NONE) || '\'\'';
  Blockly.Python.definitions_['import_time'] = "import time";
  return 'time.sleep(' + elapse + ')\n';
};

Blockly.Python['coderbot_adv_move'] = function(block) {
  // Generate Python for moving forward.
  var OPERATORS = {
    FORWARD: ['forward'],
    BACKWARD: ['backward'],
    LEFT: ['left'],
    RIGHT: ['right']
  };
  var tuple = OPERATORS[block.getFieldValue('ACTION')];
  var action = tuple[0];
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE);
  var elapse = Blockly.Python.valueToCode(block, 'ELAPSE', Blockly.Python.ORDER_NONE);
  var code = "coderbot." + action + "(speed=" + speed + ", elapse="+elapse+")\n";
  return code;
};

Blockly.Python['coderbot_motion_move'] = function(block) {
  // Generate Python for moving forward.
  var dist = Blockly.Python.valueToCode(block, 'DIST', Blockly.Python.ORDER_NONE);
  var code = "get_motion().move(dist=" + dist + ")\n";
  return code;
};

Blockly.Python['coderbot_motion_turn'] = function(block) {
  // Generate Python for moving forward.
  var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE);
  var code = "get_motion().turn(angle=" + angle + ")\n";
  return code;
};

Blockly.Python['coderbot_adv_motor'] = function(block) {
  // Generate Python for moving forward.
  var speed_left = Blockly.Python.valueToCode(block, 'SPEED_LEFT', Blockly.Python.ORDER_NONE);
  var speed_right = Blockly.Python.valueToCode(block, 'SPEED_RIGHT', Blockly.Python.ORDER_NONE);
  var elapse = Blockly.Python.valueToCode(block, 'ELAPSE', Blockly.Python.ORDER_NONE);
  var code = "coderbot.motors.set(speed_left=" + speed_left + ", speed_right=" + speed_right + ", elapse=" + elapse + ")\n";
  return code;
};

Blockly.Python['coderbot_adv_stop'] = function(block) {
  // Generate Python to stop the get_bot().
  return 'coderbot.motors.stop()\n';
};

Blockly.Python['coderbot_camera_photoTake'] = function(block) {
  // Generate Python for turning left or right.
  return 'coderbot.camera.capture()\n';
};

Blockly.Python['coderbot_camera_videoRec'] = function(block) {
  // Generate Python for turning left or right.
  return 'coderbot.camera.start_recording()\n';
};

Blockly.Python['coderbot_camera_videoStop'] = function(block) {
  // Generate Python for turning left or right.
  return 'coderbot.camera.stop_recording()\n';
};

Blockly.Python['coderbot_adv_pathAhead'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().path_ahead()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findLine'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_line()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findSignal'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_signal()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findFace'] = function(block) {
  // Boolean values true and false.
  var retval = block.getFieldValue('RETVAL');
  var ret_code = {'X': '[0]', 'Y': '[1]', 'SIZE': '[2]', 'ALL': ''}[retval];
  var code = 'get_cam().find_face()' + ret_code;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findCode'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_code()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findColor'] = function(block) {
  // Boolean values true and false.
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_NONE);
  var retval = block.getFieldValue('RETVAL');
  var ret_code = {'DIST': '[0]', 'ANGLE': '[1]', 'BOTH': ''}[retval];
  var code = 'get_cam().find_color(' + color + ')' + ret_code;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['coderbot_adv_findLogo'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_logo()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

/****************************************************/
/*               Javascript Generator               */
/****************************************************/

Blockly.JavaScript['coderbot_repeat'] = function(block) {
  // Repeat n times (internal number).
  var repeats = Number(block.getFieldValue('TIMES'));
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.JavaScript['coderbot_moveForward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().forward(' + CODERBOT_MOV_FW_DEF_SPEED + ', ' + CODERBOT_MOV_FW_DEF_ELAPSE + ');\n';
};

Blockly.JavaScript['coderbot_moveBackward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().backward(' + CODERBOT_MOV_FW_DEF_SPEED + ', ' + CODERBOT_MOV_FW_DEF_ELAPSE + ');\n';
};

Blockly.JavaScript['coderbot_turnLeft'] = function(block) {
  // Generate JavaScript for turning left.
  return 'get_bot().left(' + CODERBOT_MOV_TR_DEF_SPEED + ', ' + CODERBOT_MOV_TR_DEF_ELAPSE + ');\n';
};

Blockly.JavaScript['coderbot_turnRight'] = function(block) {
  // Generate JavaScript for turning left or right.
  return 'get_bot().right(' + CODERBOT_MOV_TR_DEF_SPEED + ', ' + CODERBOT_MOV_TR_DEF_ELAPSE + ');\n';
};

Blockly.JavaScript['coderbot_say'] = function(block) {
  // Generate JavaScript for turning left or right.
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'get_bot().say(' + text + ');\n';
};

Blockly.JavaScript['coderbot_sleep'] = function(block) {
  // Generate JavaScript for sleeping.
  var elapse = Blockly.JavaScript.valueToCode(block, 'ELAPSE',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'get_cam().sleep(' + elapse + ');\n';
};

Blockly.JavaScript['coderbot_adv_move'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().forward();\n';
};

Blockly.JavaScript['coderbot_motion_move'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().forward();\n';
};

Blockly.JavaScript['coderbot_motion_turn'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().right();\n';
};

Blockly.JavaScript['coderbot_adv_motor'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get_bot().motor();\n';
};

Blockly.JavaScript['coderbot_adv_stop'] = function(block) {
  // Generate JavaScript to stop the get_bot().
  return 'get_bot().stop();\n';
};

Blockly.JavaScript['coderbot_camera_photoTake'] = function(block) {
  // Generate JavaScript for turning left or right.
  return 'get_cam().takePhoto();\n';
};

Blockly.JavaScript['coderbot_camera_videoRec'] = function(block) {
  // Generate JavaScript for turning left or right.
  return 'get_cam().videoRec();\n';
};

Blockly.JavaScript['coderbot_camera_videoStop'] = function(block) {
  // Generate JavaScript for turning left or right.
  return 'get_cam().videoStop();\n';
};

Blockly.JavaScript['coderbot_adv_pathAhead'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().path_ahead()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findLine'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_line()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findSignal'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_signal()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findFace'] = function(block) {
  // Boolean values true and false.
  var retval = block.getFieldValue('RETVAL');
  var ret_code = {'X': '[0]', 'Y': '[1]', 'SIZE': '[2]', 'ALL': ''}[retval];
  var code = 'get_cam().find_face()' + ret_code + ';';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findCode'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_code()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findColor'] = function(block) {
  // Boolean values true and false.
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_NONE);
  var retval = block.getFieldValue('RETVAL');
  var ret_code = {'DIST': '[0]', 'ANGLE': '[1]', 'BOTH': ''}[retval];
  var code = 'get_cam().find_color(' + color + ')' + ret_code + ';';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.JavaScript['coderbot_adv_findLogo'] = function(block) {
  // Boolean values true and false.
  var code = 'get_cam().find_logo()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

