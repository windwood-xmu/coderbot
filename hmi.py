import time
import coderbot
import utils.cv
from config import Config
import Image
import StringIO

from flask import Flask, render_template, request, send_file, redirect, Response, make_response, jsonify
from flask.ext.babel import Babel

app = Flask(__name__, static_url_path='')
app.debug = True
babel = Babel(app)

RECORD_PATH = 'DCIM'

# TODO :

def run_server(prog=None):
    app.shutdown_requested = False
    app.bot = coderbot.CoderBot()
    app.bot.camera.setDCIMpath(Config().get('record_path', RECORD_PATH))

    if prog is not None:
        prog()

    try:
        app.run(host='0.0.0.0', port=Config().get('listen_port', 8080), use_reloader=False, threaded=True)
    except:
        raise
    finally:
        app.shutdown_requested = True
        app.bot.shutdown()

@babel.localeselector
def get_locale():
    # Try to use the browser language
    loc = request.accept_languages.best_match(Config().get('accepted_languages', ['en', 'fr', 'it']))
    if loc is None:
        # Otherwise, use a universal language
        loc = 'en'
    # Set the speech synthesis to the language detected (according to IHM)
    app.bot.sound.language(loc)
    return loc

######################################################################################################
# Routes definition

# Paths for IHM
@app.route('/')
def handle_home():
    return render_template('index.html')
@app.route('/<filename>.html')
def handle_template(filename):
    if filename == 'gallery':
        from os import listdir
        from os.path import isfile, join, splitext
        files = [f for f in listdir(Config().get('record_path', RECORD_PATH)) if isfile(join(Config().get('record_path', RECORD_PATH), f))]
        pics = [f for f in files if splitext(f)[1].lower() in ['.jpg', '.jpeg', '.png']]
        vids = [f for f in files if splitext(f)[1].lower() in ['.h264', '.avi']]
        #pics.sort()
        #vids.sort()
        files = zip(pics, ['picture']*len(pics))
        files.extend(zip(vids, ['video']*len(vids)))
        files.sort()
        return render_template("gallery.html", pictures=files)
    return render_template("%s.html" % filename)


# Paths for video streaming
@app.route('/video')
def handle_video():
    return """<html><head><style type='text/css'> body { background-image: url(/video/stream/SD); background-repeat:no-repeat; background-position:center top; background-attachment:fixed; height:100% } </style></head><body>&nbsp;</body></html>"""

@app.route('/video/snapshot/<definition>')
def video_snapshot(definition):
    if definition not in app.bot.streamers.keys(): abort(404)
    frame = utils.cv.JPEGencode(app.bot.streamers[definition].frame)
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/jpeg'
    response.headers['Content-Disposition'] = 'attachment; filename=snapshot.jpg'
    return response

@app.route("/video/stream/<definition>")
def handle_video_stream(definition):
    if not definition in app.bot.streamers.keys(): abort(404)
    def streamer():
        while not app.shutdown_requested:
            frame = utils.cv.JPEGencode(app.bot.streamers[definition].frame)
            yield ("--BOUNDARYSTRING\r\n" +
                   "Content-type: image/jpeg\r\n" +
                   "Content-Length: " + str(len(frame)) + "\r\n\r\n" +
                   frame + "\r\n")
            time.sleep(0.1)
    try:
        return Response(streamer(), mimetype="multipart/x-mixed-replace; boundary=--BOUNDARYSTRING")
    except: pass

# Paths for CoderBot API (Motors, Sound and Camera control)

# Path for get the status of CoderBot
@app.route("/bot/status")
def handle_bot_status():
    return jsonify(status=app.bot._init_complete)

# Path for Motors or GPIO API
@app.route("/bot/motors/<movement>", methods=['GET'])
def handle_bot_motors(movement):
    if movement == 'stop':
        app.bot.motors.stop()
    elif movement == 'set':
        speed_left = request.args.get('speed_left', Config().get('default_move_speed', 100))
        speed_right = request.args.get('speed_right', Config().get('default_move_speed', 100))
        elapse = request.args.get('elapse')
        app.bot.motors.set(speed_left, speed_right, elapse)
    elif movement in ['move', 'turn', 'forward', 'backward', 'right', 'left']:
        speed = request.args.get('speed', Config().get('default_move_speed', 100))
        elapse = request.args.get('elapse')
        cmd = getattr(app.bot.motors, movement)
        cmd(speed, elapse)
    else:
        return abort(404)
    return jsonify(result=True)

# Path for Sound API
@app.route("/bot/sound/<command>", methods=['GET'])
def handle_bot_sound(command):
    if not command in ['play', 'say']: return abort(404)
    if command == 'play': snd = request.args.get('filename')
    else:                 snd = request.args.get('what')
    if snd is not None:
        getattr(app.bot.sound, command)(snd)
        return jsonify(result=True)
    return jsonify(result=False, error='Invalid argument')

# Path for Camera API
@app.route("/bot/camera/<command>")
def handle_bot_camera(command):
    if not command in ['capture', 'start_recording', 'stop_recording']: return abort(404)
    if command == 'stop_recording':
        app.bot.camera.stop_recording()
    else:
        filename = request.args.get('filename')
        # size = request.args.get('size')
        # Or : size = (request.args.get('width|i'), request.args.get('height|i'))
        getattr(app.bot.camera, command)(filename)
    return jsonify(result=True)

# Path for system API control
@app.route("/system/<command>", methods=['GET'])
def handle_system(command):
    from os import system
    if not command in ['halt', 'reboot', 'restart']: return abort(404)
    if command == 'restart':
        os.system ('sudo service coderbot restart')
    else:
        os.system ("sudo %s" % command)

# TODO : Ecrire les methodes pour toutes les commandes d'acces aux photos
# (list, view thumbs, view, download, delete)
@app.route("/camera/DCIM")
def handle_photos_list():
    return abort(503)
@app.route("/camera/DCIM/<filename>")
def handle_photos(filename):
    from os.path import join
    if request.args.get('thumb'):
        im = Image.open(join(Config().get('record_path', RECORD_PATH), filename))
        im.thumbnail((80,60), Image.ANTIALIAS)
        io = StringIO.StringIO()
        im.save(io, format='JPEG')
        return Response(io.getvalue(), mimetype='image/jpeg')
    if request.args.get('delete'):
        from os import unlink
        try:
            unlink(join(Config().get('record_path', RECORD_PATH), filename))
            return jsonify(result=True)
        except:
            return jsonify(result=False)
    return send_file(join(Config().get('record_path', RECORD_PATH), filename))

# TODO : Ecrire les methodes pour la gestion des programmes
# (list, load, save, delete, exec, abort, status)
@app.route("/program")
def handle_program():
    return abort(503)



if __name__ == '__main__':
    def demo():

        def retrieveDetections(frame):
            if hasattr(app.bot.streamers['LD'].frame, 'faces'):
                faces = app.bot.streamers['LD'].frame.faces
                # Apply zoom on rectangles
                # TODO: Pourquoi *2 ? le rapport entre le flux SD et LD est de 4 !
                frame.faces = faces*2

        app.bot.streamers['LD'].addProcess(utils.cv.faceDetect)
        app.bot.streamers['SD'].addProcess(retrieveDetections)
        app.bot.streamers['LD'].addProcess(utils.cv.drawFaces)
        app.bot.streamers['SD'].addProcess(utils.cv.drawFaces)
        app.bot.streamers['SD'].addProcess(utils.cv.drawFPS)

    run_server(demo)

