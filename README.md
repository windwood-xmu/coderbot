CODERBOT V4 (Work in Progress)
==============================

Description
-----------

CoderBot is a programmable robot with educational purpose.
It is based on the Raspberry Pi microcomputer, it uses it's GPIOs to control motors or servos in order to
move himself.
It uses the Raspberry Pi Camera for remote monitor and artificial vision.
It is programmable using a function blocks programming environment, based on the Blockly framework.

Version 4.0 is a complete rewrite, still work in progress.

Overall Architecture
--------------------

Classes:

**(Flask server)**
- routes all APIs to corresponding services exported by Classes
- provides video stream
- provides static and dynamic files (html, photos, videos)

**CoderBot**
- provides 'facade' to all major bot submodules and functions
- load global configuration

**Sensor (superclass)**
- provides I/O low level functions
- provides low level motor control
- provides low level "180° servo" motors control

**MovementsControl (superclass)**
- provides high level motor control functions, both "DC" and "continuous servo" type

**Sound**
- provides speech synthesis
- provides audio playback

TODO
----

**Blockly**
- [x] Upgrade to the latest blockly version
- [ ] Write the block's python generator to be compatible with the new Coderbot object (work is started)
- [ ] Write new blocks (like GPIO's sensor blocks, hear blocks, event driven blocks, etc...)
- [ ] Simplify code generation when the admin configuration page is done by using decorated classes or subclasses for coderbot.motors calls (to render readable code for childs)
- [x] Use private user configuration for basic blocks (for default parameters)
- [ ] Rewrite the javascript code generator to use Blockly debugger

**Program API**
- [x] Rewrite cleanly the program API
- [x] Integrate the run/abort program feature (execution is done in a secure environment)

**Web based UI**
- [x] Login available - only if a username.cfg file exists, no password is needed, only one user at a time for now
- [x] Control like drone page
  - [x] Real time coderbot vision by camera streaming
  - [x] Control the bot motors (forward, backward, left, right)
  - [x] Take pictures or record videos
  - [x] View recorded pictures and videos in a gallery
  - [ ] User can choose the streaming definition (HD, SD or LD)
- [x] Programmation page
  - [x] Use blockly for code scripting
  - [x] Load/Save/Rename/Run/Abort a blockly program
  - [x] Real time coderbot vision by camera streaming while a program runs
- [x] Configuration page
  - [x] Admin configuration, for CoderBot object specific configuration (default sensors according hardware, video configuration, ...)
    - [x] Basic hardware configuration (camera resolutions/framerate, motors/servos pins configuration)
    - [ ] Advanced hardware configuration (add sensors to the default configuration)
    - [x] Basic system configuration (TCP port to UI listen on, system command to use for speech synthesis or other)
    - [x] Users management (add/delete users) for admin only
  - [x] Per-user (basic and advanced) configuration. This is the UI configuration according user's age
    - [x] User can choose advanced or easy mode for configuration and save the choice
    - [x] Path to store pictures and videos recorded by the camera
  - [ ] Reset the configuration to the default (by deleting the configuration file content, for now: echo > path_to_user_profil/user.cfg)

**Sensor features**
- [x] Write classes to be called back by image processors:
  - [ ] code detection
  - [x] color detection
  - [x] face detection
  - [ ] line detection
  - [ ] logo detection
  - [x] optical flow detection
  - [ ] pedestrian detection
  - [ ] path detection
  - [ ] signal detection
  - [ ] drawing feature on streamed images (to use the print block)

**Other features (optionnaly)**
- [ ] All TODOs in the code will be treated
- [ ] Wifi configuration helper (via UI web page)
- [ ] Audio hearing by using microphone
- [ ] 3D mapping environment (not sure raspberry can do it alone)
- [ ] Review all translation files

