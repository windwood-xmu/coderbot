import json
from utils.POO import SingletonDecorator as Singleton

# TODO:
# - make less coderbot dependent (default filename)
# - don't use singleton here
#DEFAULT_CONFIG_FILENAME = "config.cfg"
DEFAULT_CONFIG_FILENAME = "coderbot.cfg"

@Singleton
class Config:
    def __init__(self, filename=None):
        # Avoid reinitialisation in case of multiple call
        if hasattr(self, '_config') and self._config: return

        if filename is None: filename = DEFAULT_CONFIG_FILENAME
        self._filename = filename
        self._config = {}
        self.load()

    def get(self, item, default=None):
        # Return None if item is missing, don't raise exception
        return self._config.get(item, default)
    def set(self, item, value):
        self[item] = value

    def __getitem__(self, item):
        # Raise a KeyError if item is missing
        return self._config[item]
    def __setitem__(self, item, value):
        self._config[item] = value
    def __contains__(self, item):
        return self._config.has_key(item)

    def load(self, filename=None):
        if not filename is None: self._filename = filename
        try:
            with open(self._filename, 'r') as f:
                self._config = json.load(f)
                return len(self._config.keys())
        except IOError:
            return 0
    def save(self):
        with open(self._filename, 'w') as f:
            json.dump(self._config, f, indent=4)

