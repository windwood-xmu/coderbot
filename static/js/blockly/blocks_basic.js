'use strict';

Blockly.HSV_SATURATION=.99;
Blockly.HSV_VALUE=.99;

// Basic extension to Blockly's language.

Blockly.Blocks['coderbot_repeat'] = {
  /**
   * Block for repeat n times (internal number).
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
    this.setColour(120);
    var di = this.appendDummyInput();
    di.appendField(new Blockly.FieldImage('/images/blocks/loop_repeat.png', 32, 32, '*'));
    di.appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES');
    var si = this.appendStatementInput('DO');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_moveForward'] = {
  // Block for moving forward.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move');
    this.setColour(40);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/move_forward.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('CoderBot_moveForwardTooltip');
  }
};

Blockly.Blocks['coderbot_moveBackward'] = {
  // Block for moving forward.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move');
    this.setColour(40);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/move_backward.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('CoderBot_moveBackwardTooltip');
  }
};

Blockly.Blocks['coderbot_turnLeft'] = {
  // Block for turning left.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Turn');
    this.setColour(40);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/move_left.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_turnTooltip'));
  }
};

Blockly.Blocks['coderbot_turnRight'] = {
  // Block for turning right.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Turn');
    this.setColour(40);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/move_right.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_turnTooltip'));
  }
};

Blockly.Blocks['coderbot_say'] = {
  // Block for text to speech.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Say');
    this.setColour(290);
    var vi = this.appendValueInput('TEXT');
    vi.setCheck(["String", "Number", "Date"]);
    vi.appendField(new Blockly.FieldImage('/images/blocks/say.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_sayTooltip'));
  }
};

Blockly.Blocks['coderbot_camera_photoTake'] = {
  // Block for taking a picture.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Turn');
    this.setColour(120);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/photo_take.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_PhotoTooltip'));
  }
};

Blockly.Blocks['coderbot_camera_videoRec'] = {
  // Block for recording a video (start).
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Turn');
    this.setColour(120);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/video_rec.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_VideoTooltip'));
  }
};

Blockly.Blocks['coderbot_camera_videoStop'] = {
  // Block for recording a video (stop).
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Turn');
    this.setColour(120);
    var di = this.appendDummyInput()
    di.appendField(new Blockly.FieldImage('/images/blocks/video_stop.png', 32, 32, '*'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_VideoTooltip'));
  }
};

