import urllib2
import json
import uuid 
import logging

class MethodRequest(urllib2.Request):
    def __init__(self, *args, **kwargs):
        if 'method' in kwargs:
            self._method = kwargs['method']
            del kwargs['method']
        else:
            self._method = None
        return urllib2.Request.__init__(self, *args, **kwargs)

    def get_method(self, *args, **kwargs):
        if self._method is not None:
            return self._method
        return urllib2.Request.get_method(self, *args, **kwargs)

class CoderBotServerAPI:

  API_HOST_PROD = "http://my.coderbot.org"
  API_HOST = "http://192.168.1.102:8080"
  API_BASE_URL = "/api/coderbot/1.0"

  @classmethod
  def get_bot_id(cls):
    return hex(uuid.getnode())[2:-1]

  @classmethod
  def get_auth(cls):
    return "CoderBot 123456"

  @classmethod
  def bot_new(cls, bot_name, bot_ipaddr, bot_version, user_email):
    bot_id = cls.get_bot_id()
    data = {"bot_name": bot_name,
            "bot_ip": bot_ipaddr,
            "bot_version": bot_version,
            "user_email": user_email}
    req = urllib2.Request(cls.API_HOST + cls.API_BASE_URL + "/bot/" + bot_id, json.dumps(data))
    return cls.http_send(req)

  @classmethod
  def get_bot(cls):
    bot_id = cls.get_bot_id()
    req = urllib2.Request(cls.API_HOST + cls.API_BASE_URL + "/bot/" + bot_id)
    return cls.http_send(req)

  @classmethod
  def set_bot(cls, bot_name, bot_ipaddr, bot_version):
    bot_id = cls.get_bot_id()
    data = {"bot_name": bot_name,
            "bot_ip": bot_ipaddr,
            "bot_version": bot_version}
    logging.info("bot: " + str(data))
    req = MethodRequest(cls.API_HOST + cls.API_BASE_URL + "/bot/" + bot_id, json.dumps(data), method="PUT")
 
    return cls.http_send(req)

  @classmethod
  def programs_list(cls):
    bot_id = cls.get_bot_id()
    req = urllib2.Request(cls.API_HOST + cls.API_BASE_URL + "/bot/" + bot_id + "/programs")
    return cls.http_send(req)

  @classmethod
  def program_save(cls, program_id, program_name, program_code, program_tags=[]):
    bot_id = cls.get_bot_id()
    data = { "name": program_name,
             "data": program_code,
             "tags": program_tags }
     
    req = urllib2.Request(cls.API_HOST + cls.API_BASE_URL + "/bot/" + bot_id + "/programs/" + str(program_id), json.dumps(data))
    return cls.http_send(req)

  @classmethod
  def http_send(cls, req):
    try:
      req.add_header("Authorization", cls.get_auth())
      ret = urllib2.urlopen(req)
      if ret.getcode() != 200:
        raise Exception()
      return json.loads(ret.read())
    except Exception as e:
      logging.error("except: " + str(e))
      raise

