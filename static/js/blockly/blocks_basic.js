'use strict';

Blockly.HSV_SATURATION=0.65;
Blockly.HSV_VALUE=0.85;

var TOOLTIPS = {
  "FORWARD":  Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD,
  "BACKWARD": Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD,
  "LEFT":     Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT,
  "RIGHT":    Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT
};

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
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/move_forward.png",
          "width": 32,
          "height": 32,
          "alt": "↑"
        }
      ],
      "colour": 40,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS["FORWARD"])
    });
  }
};

Blockly.Blocks['coderbot_moveBackward'] = {
  // Block for moving backward.
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/move_backward.png",
          "width": 32,
          "height": 32,
          "alt": "↓"
        }
      ],
      "colour": 40,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS["BACKWARD"])
    });
  }
};

Blockly.Blocks['coderbot_turnLeft'] = {
  // Block for turning left.
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/move_left.png",
          "width": 32,
          "height": 32,
          "alt": "←"
        }
      ],
      "colour": 40,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS["LEFT"])
    });
  }
};

Blockly.Blocks['coderbot_turnRight'] = {
  // Block for turning right.
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/move_right.png",
          "width": 32,
          "height": 32,
          "alt": "→"
        }
      ],
      "colour": 40,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS["RIGHT"])
    });
  }
};

Blockly.Blocks['coderbot_say'] = {
  // Block for text to speech.
  init: function() {
    this.jsonInit({
      "message0": "%1 %2",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/say.png",
          "width": 32,
          "height": 32,
          "alt": "*"
        },
        { "type": "input_value",
          "name": "TEXT",
          "check": ["String", "Number", "Date"]
        }
      ],
      "colour": 290,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_SOUND_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_SOUND_SAY_TOOLTIP
    });
  }
};

Blockly.Blocks['coderbot_camera_photoTake'] = {
  // Block for taking a picture.
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/photo_take.png",
          "width": 32,
          "height": 32,
          "alt": "*"
        }
      ],
      "colour": 120,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_CAMERA_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT_TOOLTIP
    });
  }
};

Blockly.Blocks['coderbot_camera_videoRec'] = {
  // Block for recording a video (start).
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/video_rec.png",
          "width": 32,
          "height": 32,
          "alt": "⏺"
        }
      ],
      "colour": 120,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_CAMERA_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_CAMERA_START_RECORDING_TOOLTIP
    });
  }
};

Blockly.Blocks['coderbot_camera_videoStop'] = {
  // Block for recording a video (stop).
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        { "type": "field_image",
          "src": "/images/blocks/video_stop.png",
          "width": 32,
          "height": 32,
          "alt": "⏹"
        }
      ],
      "colour": 120,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_CAMERA_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING_TOOLTIP
    });
  }
};

