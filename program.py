############################################################################
#    CoderBot, a didactical programmable robot.
#    Copyright (C) 2014, 2015 Roberto Previtera <info@coderbot.org>
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License along
#    with this program; if not, write to the Free Software Foundation, Inc.,
#    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
############################################################################

import os
import sys
import threading
import json
import logging
import datetime

import coderbot
import camera
import motion
import config
import audio

import api

PROGRAM_PATH = "./data/"
PROGRAM_PREFIX = "program_"
PROGRAM_SUFFIX = ".data"

def get_cam():
  return camera.Camera.get_instance()

def get_bot():
  return coderbot.CoderBot.get_instance()

def get_motion():
  return motion.Motion.get_instance()

def get_audio():
  return audio.Audio.get_instance()

def get_prog_eng():
  return ProgramEngine.get_instance()

class ProgramEngine:

  _instance = None

  def __init__(self):
    self._program = None
    self._repository = {}
    for dirname, dirnames, filenames, in os.walk("./data"):
      for filename in filenames:
        if PROGRAM_PREFIX in filename:
          program_name = filename[len(PROGRAM_PREFIX):-len(PROGRAM_SUFFIX)]    
          self._repository[program_name] = filename
    
  @classmethod
  def get_instance(cls):
    if not cls._instance:
      cls._instance = ProgramEngine()
    return cls._instance

  def list(self):
    return self._repository.keys()
    
  def save(self, program_new):
    program = self.load(program_new.name)
    if program:
      program.update(program_new)
    else:
      program = program_new

    program.m_d = datetime.datetime.now()
    self._program = program
    self._repository[program.name] = PROGRAM_PREFIX + program.name + PROGRAM_SUFFIX
    f = open(PROGRAM_PATH + PROGRAM_PREFIX + program.name + PROGRAM_SUFFIX, 'w')
    json.dump(program.as_json(), f)
    f.close()
    
    #api.CoderBotServerAPI.program_save(program.uid, program.name, program.as_json(), [])
   
  def load(self, name):
    f = open(PROGRAM_PATH + PROGRAM_PREFIX + name + PROGRAM_SUFFIX, 'r')
    self._program = Program.from_json(json.load(f))
    return self._program

  def delete(self, name):
    del self._repository[name]
    os.remove(PROGRAM_PATH + PROGRAM_PREFIX + name + PROGRAM_SUFFIX)
    return "ok"

  def create(self, name, code):
    self._program = Program(None, name, code)
    return self._program

  def is_running(self, name):
    return self._repository[name].is_running()

  def check_end(self):
    return self._program.check_end()

  def sync_with_server(self):
    retval = api.CoderBotServerAPI.programs_list()
    remote_programs = retval.get("program_list")
    
    progs_r = dict(map(lambda x: (x.get("uid"), x), remote_programs))
    progs_l = {}

    # save to server
    logging.info("saving to server")
    for p_name in self._repository.keys():
      p = self.load(p_name)
      # save new to server
      if p.uid is None or progs_r.get(p.uid) == None:
        logging.info("saving: " + p.name)
        retval = api.CoderBotServerAPI.program_save(p.uid, p.name, p.as_json())
        if retval.get("status", "ko") == "ok":
          p.uid = retval.get("program").get("uid")
          self.save(p)
      else:
        #update existing
        p_r = progs_r.get(p.uid)
        if p_r and p_r.get("version") < p.version:
          logging.info("updating: " + p.name)
          retval = api.CoderBotServerAPI.program_save(p.uid, p.name, p.as_json())
          self.save(p)

      progs_l[p.uid] = p

    #load from server
    for p_r in progs_r.values(): 
      if progs_l.get(p_r.get("uid")) is None:
        p = Program.from_json(p_r)
        logging.info("loading: " + p.name)
        self.save(p)
      
class Program:
  _running = False

  def __init__(self, uid=None, name=None, code=None, dom_code=None, version=0):
    self._thread = None
    self.name = name
    self._dom_code = dom_code
    self._code = code 
    self.version = version
    self.uid = uid
    self.c_d = datetime.datetime.now()
    self.m_d = datetime.datetime.now()

  @property
  def code(self):
    return self._code

  @property
  def dom_code(self):
    return self._dom_code
  
  def update(self, program):
    self.uid = program.uid
    self._dom_code = program._dom_code
    self._code = program._code
    self.c_d = program.c_d
    self.m_d = program.m_d
    self.version += 1

  def execute(self):
    if self._running:
      raise RuntimeError('already running')

    self._running = True

    try:
      self._thread = threading.Thread(target=self.run)
      self._thread.start()
    except RuntimeError as re:
      logging.error("RuntimeError:" + str(re))
    return "ok"

  def end(self):
    if self._running:
      self._running = False
      self._thread.join()

  def check_end(self):
    if self._running == False:
      raise RuntimeError('end requested')
    return None

  def is_running(self):
    return self._running

  def run(self):
    try:
      #print "run.1"
      bot = coderbot.CoderBot.get_instance()
      program = self
      try:
	cam = camera.Camera.get_instance()
        if config.Config.get().get("prog_video_rec") == "true":
          get_cam().video_rec(program.name)
          logging.debug("starting video")
      except:
        logging.error("Camera not available")
      
      exec(self._code)
      #print "run.2"
    except RuntimeError as re:
      logging.info("quit: " + str(re))
    finally:
      try:
        get_cam().video_stop() #if video is running, stop it
        get_motion().stop()
      except:
        logging.error("Camera not available")
      self._running = False

  def as_json(self):
    return {'uid': self.uid,
            'name': self.name,
            'dom_code': self._dom_code,
            'code': self._code,
            'version': self.version,
            'c_d': datetime.datetime.strftime(self.c_d, "%Y%m%d%H%M%S"),
            'm_d': datetime.datetime.strftime(self.m_d, "%Y%m%d%H%M%S"),}

  @classmethod
  def from_json(cls, map):
    program = Program(uid=map.get('uid', None), name=map['name'], dom_code=map['dom_code'], code=map['code'], version=map.get('version', 0))
    if map.get('c_d'):
      program.c_d = datetime.datetime.strptime(map['c_d'], "%Y%m%d%H%M%S")
      program.m_d = datetime.datetime.strptime(map['m_d'], "%Y%m%d%H%M%S")
    return program
