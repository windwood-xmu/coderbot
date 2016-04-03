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
- [ ] Upgrade to the latest blockly version (only advanced blocks are done for now)
- [ ] Write the block's python generator to be compatible with the new Coderbot object (work is started)
- [ ] Write new blocks (like GPIO's sensor blocks, hear blocks, event driven blocks, etc...)
- [ ] Simplify code generation when the admin configuration page is done by using decorated classes or subclasses for coderbot.motors calls (to render readable code for childs)
- [ ] Use private user configuration for basic blocks (for default parameters)
- [ ] Rewrite the javascript code generator to use Blockly debugger

**Program API**
- [x] Rewrite cleanly the program API
- [ ] Integrate the run/abort program feature

**Web based UI**
- [ ] Write the configuration page
- [ ] Write the admin configuration page. This is the CoderBot object specific configuration (default sensors according hardware, video configuration, ...)
- [ ] Write the per-user (basic and advanced) configuration page. This is the UI configuration according user's age

**Sensor features**
- [ ] Write functions to be called back by image processors:
  - [ ] code detection
  - [ ] color detection
  - [ ] face detection
  - [ ] line detection
  - [ ] logo detection
  - [ ] optical flow detection
  - [ ] pedestrian detection
  - [ ] path detection
  - [ ] signal detection
  - [ ] drawing detections on streamed images

**Other features (optionnaly)**
- [ ] All TODOs in the code will be treated
- [ ] Wifi configuration helper (via UI web page)
- [ ] Audio hearing by using microphone
- [ ] 3D mapping environment (not sure raspberry can do it alone)

