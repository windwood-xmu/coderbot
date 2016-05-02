import json
from utils.POO import SingletonDecorator as Singleton

# TODO:
# - make less coderbot dependent (default filename)
# - don't use singleton here
#DEFAULT_CONFIG_FILENAME = "config.cfg"
#DEFAULT_CONFIG_FILENAME = "coderbot.cfg"

@Singleton
class Config:
    def __init__(self, filename=None):
        # Avoid reinitialisation in case of multiple call
        if hasattr(self, '_config') and self._config: return

        #if filename is None: filename = DEFAULT_CONFIG_FILENAME
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
    def save(self, filename=None):
        if not filename is None: self._filename = filename
        with open(self._filename, 'w') as f:
            json.dump(self._config, f, indent=4)

@Singleton
class MultifileConfig:
    def __init__(self, filename=None):
        self._filenames = [None]
        self._configs = [{}]
        if not filename is None: self.load(filename)

    def get(self, item, default=None):
        for d in self._configs:
            if item in d.keys():
                return d[item]
        return default
    def set(self, item, value, filename=None):
        if filename is None: filename = self._filenames[0]
        self._configs[self._filenames.index(filename)][item] = value

    def __getitem__(self, item):
        for d in self._configs:
            if item in d.keys():
                return d[item]
        raise AttributeError
    def __setitem__(self, item, value):
        # The default is to set to the last conf file loaded
        self._configs[0][item] = value
    def __contains__(self, key):
        return True in map(lambda d: d.has_key(key), self._configs)

    def load(self, filename=None):
        if filename is None: return
        try:
            with open(filename, 'r') as f:
                self._configs.insert(0, json.load(f))
                self._filenames.insert(0, filename)
            return len(self._configs[0].keys())
        except IOError:
            return 0
    def save(self, saveas=None):
        for filename, config in zip(self._filenames, self._configs):
            if filename is None: filename = saveas
            if filename is None: continue
            with open(filename, 'w') as f:
                json.dump(config, f, indent=4)
    def close(self, filename=None):
        if filename is None:
            self._filenames.pop(0)
            self._configs.pop(0)
        else:
            index = self._filenames.index(filename)
            self._filenames.pop(index)
            self._configs.pop(index)

