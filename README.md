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
- provide static files (html, photos, videos)

**CoderBot**
- provides 'facade' to all major bot submodules and functions
- load global configuration

**Sensor (superclass)**
- provides I/O low level functions
- provides low level motor control

**MovementsControl (superclass)**
- provides high level motor control functions, both "DC", "continuous servo", "180° servo" motors types

**Sound**
- provides speech synthesis
- provides audio playback

