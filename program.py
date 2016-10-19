from os.path import exists as pathexists, isfile, join as path_join, splitext
from os import strerror, unlink, listdir
import errno
import json
import threading

from config import MultifileConfig as Config
from coderbot import CoderBot

# Default values, overwrited by admin configuration
PROGRAM_PATH = 'data'
PROGRAM_EXTENSION = 'bot'


class Program(object):
    @staticmethod
    def listdir(path=None):
        if path is None: path = Config().get('program_path', PROGRAM_PATH)
        files = [f for f in listdir(path) if isfile(path_join(path, f))]
        files = [splitext(f)[0] for f in files if splitext(f)[1].lower() == ".%s" % Config().get('program_extension', PROGRAM_EXTENSION)]
        return files

    @staticmethod
    def _getpath(filename):
        return path_join(Config().get('program_path', PROGRAM_PATH), "%s.%s" % (filename, Config().get('program_extension', PROGRAM_EXTENSION)))

    @staticmethod
    def new(filename, overwrite=False, dom=None, code=None):
        # check if file exists
        path = Program._getpath(filename)
        if pathexists(path) and (not overwrite or not isfile(path)):
            raise OSError(errno.EEXIST, strerror(errno.EEXIST), path)

        # create an empty file for filename reservation
        #open(path, 'w').close()
        return Program(filename, dom, code)

    @staticmethod
    def load(filename):
        # check if file exists
        path = Program._getpath(filename)
        if not isfile(path):
            raise OSError(errno.ENOENT, strerror(errno.ENOENT), path)

        # try to open the file and load datas
        with open(path, 'r') as f:
            data = json.load(f)
        return Program(filename, data.get('dom_code'), data.get('py_code'))

    @staticmethod
    def delete(filename):
        # check if file exists
        path = Program._getpath(filename)
        if not isfile(path):
            raise OSError(errno.EEXIST, strerror(errno.EEXIST), path)

        # try to delete the file on system
        return unlink(path) # probably return always None

    def __init__(self, filename, dom=None, code=None):
        self._name = filename
        self._dom  = dom
        self._code = code
        self._running = False
        self._shutdown = False
        self._thread = None

    def update(self, dom=None, code=None):
        # save in self instance dom and/or code
        if dom is not None:  self._dom  = dom
        if code is not None: self._code = code
    def get(self):
        return {
          'name': self._name,
          'dom_code': self._dom,
          'py_code': self._code
          }

    def save(self):
        # save datas in the file
        path = Program._getpath(self._name)
        data = {'name': self._name,
            'dom_code': self._dom,
            'py_code': self._code}
        with open(path, 'w') as f:
            json.dump(data, f, indent=4, sort_keys=True)

#    This can be done by the use of the 'new' static method and 'save'
#    def save_as(self, filename, overwrite=False):
#        # check if file exists
#        # empty the file if overwrite
#        # save datas in the file
#        pass

    def start(self):
        # if file is loaded
        if self._running: raise RuntimeError('already running')
        if not self._code: return False
        # exec in a separate thread the _run method
        self._running = True
        self._thread = threading.Thread(target=self._run)
        self._thread.start()
        return True

    def stop(self):
        # try to abort the program
        # and wait for it (perhaps with timeout to force shutdown)
        if self._running:
            self._shutdown = True
            self._thread.join()

    def isRunning(self):
        # get the running status of the program
        return self._running

    def infinite_loop_trap(self, msg=""):
        if self._shutdown:
            raise KeyboardInterrupt(msg)

    def _run(self):
        # exec in a secure environment the coderbot
        coderbot = CoderBot()
        glbs = {'__name__': self._name,
          'program': self,
          'config': Config(),
          'coderbot': coderbot
          }
        if Config().get('program_video_rec', False):
            coderbot.camera.start_recording()
        try: exec(self._code, glbs)
        except: raise
        finally:
            coderbot.camera.stop_recording()
            coderbot.motors.stop()
            for sensor in coderbot.sensors.itervalues():
                try: sensor._stop()
                except AttributeError: pass
            self._running = False
            self._shutdown = False

