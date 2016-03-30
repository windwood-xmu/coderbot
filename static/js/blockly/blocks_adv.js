'use strict';

Blockly.HSV_SATURATION=.99;
Blockly.HSV_VALUE=.99;

// Advanced extensions to Blockly's language.

Blockly.Blocks['coderbot_repeat'] = {
  /**
   * Block for repeat n times (internal number).
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
    this.setColour(120);
    var di = this.appendDummyInput();
    di.appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
    di.appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES');
    di.appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
    var si = this.appendStatementInput('DO');
  	si.appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
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
    di.appendField(Blockly.Msg.CODERBOT_MOVE_FORWARD)
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
    di.appendField(Blockly.Msg.CODERBOT_MOVE_BACKWARD)
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
    di.appendField(Blockly.Msg.CODERBOT_MOVE_LEFT);
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
    di.appendField(Blockly.Msg.CODERBOT_MOVE_RIGHT)
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
  	vi.appendField(Blockly.Msg.CODERBOT_SAY);
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
    di.appendField(Blockly.Msg.CODERBOT_PHOTO_TAKE)
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
    di.appendField(Blockly.Msg.CODERBOT_VIDEO_REC)
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
    di.appendField(Blockly.Msg.CODERBOT_VIDEO_STOP)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_VideoTooltip'));
  }
};

Blockly.Blocks['coderbot_sleep'] = {
  // Block for text to sleep.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Sleep');
    this.setColour(290);
    this.appendValueInput('ELAPSE')
        .setCheck(["Number"])
        .appendField(Blockly.Msg.CODERBOT_SLEEP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_sleepTooltip'));
  }
};

Blockly.Blocks['coderbot_adv_move'] = {
  // Block for moving forward.
  init: function() {
    var ACTIONS =
        [[Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD, 'FORWARD'],
        [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD, 'BACKWARD'],
        [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT, 'LEFT'],
        [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT, 'RIGHT']]
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move');
    this.setColour(40);
    this.interpolateMsg(Blockly.Msg.CODERBOT_MOVE_ADV_MOVE,
                        ['TEXT', null, Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    
    this.appendDummyInput("ACTION")
       .appendField(new Blockly.FieldDropdown(ACTIONS), 'ACTION');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_ADV_SPEED);
    this.appendValueInput('ELAPSE')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('ACTION');
      var TOOLTIPS = {
        FORWARD: Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD,
        BACKWARD: Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD,
        LEFT: Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT,
        RIGHT: Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT,
      };
      return TOOLTIPS[mode] + Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL;
    });
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['coderbot_motion_move'] = {
  // Block for moving forward.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move');
    this.setColour(40);
    this.interpolateMsg(Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE,
                        ['TEXT', null, Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);

    this.appendValueInput('DIST')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_MOTION_DIST);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE_TIP;
    });
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['coderbot_motion_turn'] = {
  // Block for moving forward.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move');
    this.setColour(40);
    this.interpolateMsg(Blockly.Msg.CODERBOT_MOVE_MOTION_TURN,
                        ['TEXT', null, Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_MOTION_ANGLE);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CODERBOT_MOVE_MOTION_TURN_TIP;
    });
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['coderbot_adv_motor'] = {
  // Block for moving forward.
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Motor');
    this.setColour(40);
    this.interpolateMsg(Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR,
                        ['TEXT', null, Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    
    this.appendValueInput('SPEED_LEFT')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_LEFT);
    this.appendValueInput('SPEED_RIGHT')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_RIGHT);
    this.appendValueInput('ELAPSE')
        .setCheck('Number')
        .appendField(Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('ACTION');
      return TOOLTIPS[mode] + Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL;
    });
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['coderbot_adv_stop'] = {
  // Block to stop the get_bot().
  init: function() {
    this.setHelpUrl('http://code.google.com/p/blockly/wiki/Stop');
    this.setColour(40);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_MOVE_STOP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(('CoderBot_stopTooltip'));
  }
};

Blockly.Blocks['coderbot_adv_pathAhead'] = {
  /**
   * Block for pathAhead function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findLine'] = {
  /**
   * Block for pathAhead function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDLINE);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findSignal'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findFace'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDFACE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.CODERBOT_SENSOR_FINDFACE_X, 'X'], [Blockly.Msg.CODERBOT_SENSOR_FINDFACE_Y, 'Y'],[Blockly.Msg.CODERBOT_SENSOR_FINDFACE_SIZE, 'SIZE'],[Blockly.Msg.CODERBOT_SENSOR_FINDFACE_ALL,'ALL']]), 'RETVAL')
    this.setInputsInline(true);
    this.setOutput(true, ['Number', 'Array']);
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findCode'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDCODE);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findColor'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_FIND)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_DIST, 'DIST'], [Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_ANGLE, 'ANGLE'],[Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_BOTH,'BOTH']]), 'RETVAL')
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_COLOR);
    this.appendValueInput('COLOR')
        .setCheck('Colour');
    this.setInputsInline(true);
    this.setOutput(true, ['Number', 'Array']);
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['coderbot_adv_findLogo'] = {
  /**
   * Block for findLogo function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CODERBOT_SENSOR_FINDLOGO);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};


