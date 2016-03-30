import os

class Sound(object):
    def __init__(self, lang=None, use_mbrola=False, mbrolaVoiceNumber=1):
        if lang is None: lang='en'
        self._voice = lang
        self._use_mbrola = use_mbrola
        self._mbrolaVoiceNumber = mbrolaVoiceNumber

    def language(self, lang):
        self._voice = lang
    def useMbrola(self, use=True):
        self._use_mbrola = use

    def play(self, filename):
        os.system('omxplayer sounds/' + filename)
    def say(self, what):
        if what and len(what):
            if self._use_mbrola:
                cmd = "espeak -q --pho -v%s \"%s\" | mbrola /usr/share/mbrola/voices/%s - - | aplay -r16000 -fS16" % ("mb-%s%s" % (self._voice, self._mbrolaVoiceNumber), what, "%s%s" % (self._voice, self._mbrolaVoiceNumber))
            else:
                cmd = "espeak -v%s -p 90 -a 200 -s 150 -g 10 '%s' 2>>/dev/null" % (self._voice, what)
            # TODO:
            # - Lancer la commande et envoyer la phrase via stdin pour eviter d'echapper les caracteres speciaux comme " ou '
            # - Utiliser utf8 pour envoyer la phrase afin de prendre les accents en compte
            os.system(cmd)

# TODO:
#    def waitHear(self)
#    def addHearHook(self)
#    def delHearHook(self)
# Faire heriter la classe de Thread pour ecouter les sons environnant
# et emettre un signal s'il y a du son autour du robot.

