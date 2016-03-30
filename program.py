import os.path
import json

import coderbot
from config import Config


class ProgramEngine(object):
    pass

class Program(object):
    @staticmethod
    def create(filename, overwrite=False):
        # check if file exists
        # empty the file if overwrite

    @staticmethod
    def load(filename):
        # check if file exists
        # try to open the file and load datas

    def __init__(self, filename):
        self._name = filename

    def save(self):
        # check if file exists
        # save datas in the file

    def save_as(self, filename):
        # check if file exists
        # save datas in the new filename
        self._name = filename

    def delete(self):
        # check if file exists
        # try to delete the file

    def run(self):
        # if file is loaded
        # exec in a secure environment the coderbot

    def abort(self):
        # try to abort the program
        # and wait for it (perhaps with timeout to force shutdown

    def status(self):
        # get the running status of the program

