'use strict';

Blockly.HSV_SATURATION=0.65;
Blockly.HSV_VALUE=0.85;
Blockly.BlockSvg.START_HAT = true;

var TOOLTIPS = {
  "FORWARD":  Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD,
  "BACKWARD": Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD,
  "LEFT":     Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT,
  "RIGHT":    Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT
};


var Sensors = [
  [Blockly.Msg.CODERBOT_SENSOR_TIP_FPS,    "fps"],
  //[Blockly.Msg.CODERBOT_SENSOR_TIP_SQUARE, "square"],
  //[Blockly.Msg.CODERBOT_SENSOR_TIP_CIRCLE, "circle"],
  [Blockly.Msg.CODERBOT_SENSOR_TIP_LIGHT,  "light"],
  [Blockly.Msg.CODERBOT_SENSOR_TIP_COLOR,  "color"],
  [Blockly.Msg.CODERBOT_SENSOR_TIP_MOTION, "motion"],
  [Blockly.Msg.CODERBOT_SENSOR_TIP_FACE,   "face"]
];


// Advanced extension to Blockly's language.


Blockly.Blocks['coderbot_moveForward'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_FORWARD,
      "colour": 40,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS["FORWARD"])
    });
  }
};

Blockly.Blocks['coderbot_moveBackward'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_BACKWARD,
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
      "message0": Blockly.Msg.CODERBOT_TURN_LEFT,
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
      "message0": Blockly.Msg.CODERBOT_TURN_RIGHT,
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
      "message0": Blockly.Msg.CODERBOT_SOUND_SAY,
      "args0": [
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
      "message0": Blockly.Msg.CODERBOT_CAMERA_TAKE_SNAPSHOT,
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
      "message0": Blockly.Msg.CODERBOT_CAMERA_START_RECORDING,
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
      "message0": Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING,
      "colour": 120,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_CAMERA_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_CAMERA_STOP_RECORDING_TOOLTIP
    });
  }
};

Blockly.Blocks['coderbot_sleep'] = {
  // Block for text to sleep.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SLEEP,
      "args0": [
        { "type": "input_value",
          "name": "ELAPSE",
          "check": "Number"
        }
      ],
      "colour": 290,
      "previousStatement": null,
      "nextStatement": null,
      "helpUrl": Blockly.Msg.CODERBOT_SLEEP_HELPURL,
      "tooltip": Blockly.Msg.CODERBOT_SLEEP_TOOLTIP
    });
  }
};

Blockly.Blocks['coderbot_adv_move'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_ADV_MOVE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD, "FORWARD"],
            [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD, "BACKWARD"],
            [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT, "LEFT"],
            [Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT, "RIGHT"]
          ]
        },
        {
          "type": "input_value",
          "name": "SPEED",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "ELAPSE",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('ACTION');
      return Blockly.Msg.CODERBOT_MOVE_TOOLTIP.replace('%1', TOOLTIPS[mode]);
    });
  }
};

Blockly.Blocks['coderbot_motion_move'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED,
      "args0": [
        {
          "type": "input_value",
          "name": "DIST",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_MOTION_ASSISTED_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_motion_turn'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED,
      "args0": [
        {
          "type": "input_value",
          "name": "ANGLE",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "tooltip": Blockly.Msg.CODERBOT_TURN_MOTION_ASSISTED_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_motor'] = {
  // Block for moving forward.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS,
      "args0": [
        {
          "type": "input_value",
          "name": "SPEED_LEFT",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "SPEED_RIGHT",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "ELAPSE",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_ADV_MOTORS_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_stop'] = {
  // Block to stop the get_bot().
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_MOVE_STOP,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "tooltip": Blockly.Msg.CODERBOT_MOVE_ADV_STOP_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_MOVE_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_sensor_detect'] = {
  // Block to read sensor state.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_DETECT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": Sensors
        }
      ],
      "output": ["Boolean"],
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_DETECT_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_sensor_when'] = {
  // Block to sensor edge event.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_WHEN,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": Sensors
        }
      ],
      "message1": Blockly.Msg.CODERBOT_SENSOR_WHEN_DO,
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_WHEN_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_sensor_wait'] = {
  // Block to wait for sensor edge.
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_WAIT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": Sensors
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_WAIT_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};


Blockly.Blocks['coderbot_adv_pathAhead'] = {
  /**
   * Block for pathAhead function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD,
      "output": "Number", // Is it not a boolean ?
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findLine'] = {
  /**
   * Block for pathAhead function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDLINE,
      "output": "Number", // Is it not a boolean ?
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDLINE_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findSignal'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL,
      "output": "Number", // Is it not a boolean ?
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findFace'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDFACE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "RETVAL",
          "options": [
            [Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_X, "X"],
            [Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_Y, "Y"],
            [Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_SIZE, "SIZE"],
            [Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TIP_ALL, "ALL"]
          ]
        }
      ],
      "output": ["Number", "Array"],
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDFACE_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findCode'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDCODE,
      "output": "Number", // Is it not a boolean ?
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDCODE_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findColor'] = {
  /**
   * Block for findSignal function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "RETVAL",
          "options": [
            [Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_DIST, "DIST"],
            [Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_ANGLE, "ANGLE"],
            [Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TIP_BOTH, "BOTH"]
          ]
        },
        {
          "type": "input_value",
          "name": "COLOR",
          "check": "Colour"
        }
      ],
      "output": ["Number", "Array"],
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

Blockly.Blocks['coderbot_adv_findLogo'] = {
  /**
   * Block for findLogo function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CODERBOT_SENSOR_FINDLOGO,
      "output": "Number", // Is it not a boolean ?
      "colour": 290,
      "tooltip": Blockly.Msg.CODERBOT_SENSOR_FINDLOGO_TOOLTIP,
      "helpUrl": Blockly.Msg.CODERBOT_SENSOR_HELPURL
    });
  }
};

