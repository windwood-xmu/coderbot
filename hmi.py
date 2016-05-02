import time
import utils.cv
from config import MultifileConfig as Config
from program import Program
from coderbot import CoderBot
import Image
import StringIO
from re import findall
import errno
import json

from flask import Flask, render_template, request, send_file, redirect, Response, make_response, jsonify, url_for, abort, session
from flask.ext.babel import Babel

app = Flask(__name__, static_url_path='')
app.debug = True
app.secret_key = 'CoderBot v4.0'
app.program = None
babel = Babel(app)

RECORD_PATH = 'DCIM'
CONFIG_PATH = '.'
DEFAULT_CONFIG_PATH = 'coderbot.cfg'

# A template filter to get quoted elements in a string
@app.template_filter('quoted')
def quoted(s):
    l = findall('\'([^\']*)\'', str(s))
    if l:
        return l
    return None


def run_server(prog=None):
    app.shutdown_requested = False
    Config().load(DEFAULT_CONFIG_PATH)
    app.bot = CoderBot()
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
    loc = request.accept_languages.best_match(['en', 'fr', 'it'])
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
    return redirect('/control.html')
@app.route('/<filename>.html')
def handle_template(filename):
    if filename == 'gallery':
        from os import listdir
        from os.path import isfile, join, splitext
        files = [f for f in listdir(Config().get('record_path', RECORD_PATH)) if isfile(join(Config().get('record_path', RECORD_PATH), f))]
        pics = [f for f in files if splitext(f)[1].lower() in ['.jpg', '.jpeg', '.png']]
        vids = [f for f in files if splitext(f)[1].lower() in ['.h264', '.avi']]
        files = zip(pics, ['picture']*len(pics))
        files.extend(zip(vids, ['video']*len(vids)))
        files.sort()
        return render_template("gallery.html", pictures=files)
    if filename == 'preferences':
        return render_template("preferences.html", config=Config())
    return render_template("%s.html" % filename)

# Path for configuration API
@app.route("/config/<command>", methods=['GET', 'POST'])
def handle_config(command):
    if command not in ['get', 'save']: abort(404) # Not found
    if command == 'get' and request.method == 'GET':
        if len(request.args):
            d = dict([(k,Config().get(k)) for k in request.args.iterkeys()])
        else:
            d = Config()._config
        return jsonify(**d)
    if command == 'save' and request.method == 'POST':
        glbs = {'__builtins__':None, 'yes':True, 'true':True, 'no':False, 'false':False}
        for k,v in json.loads(request.form.get('json')).iteritems():
            if k == 'camera_resolutions':
                for i,r in v.iteritems(): v[i] = eval(r.lower(), glbs)
            else:
                try: v = eval(v.lower(), glbs)
                except: pass
            Config().set(k, v)
            # TODO: call the commands to set new Coderbot configuration
        Config().save()
        return jsonify(result=True)
    # TODO: if command == 'reset': erase config file content
    abort(405) # Not allowed

# Path for user's session API
@app.route('/user/<command>', methods=['GET', 'POST'])
def handle_user(command):
    if command == 'login' and request.method == 'POST':
        from os.path import isfile
        from os.path import isfile, join, splitext
        username = request.form.get('username', '')
        filename = join(Config().get('config_path', CONFIG_PATH), "%s.cfg" % username.lower())
        if username.lower() == 'admin' or isfile(filename):
            session['username'] = username
            if username.lower() != 'admin':
                Config().load(filename)
                # TODO: call the commands to set new Coderbot configuration
            return redirect(request.referrer)
        abort(401) # Unauthorized without authentication
    if command == 'logout' and request.method == 'GET':
        if session.pop('username', None) != 'admin':
            # Close only the last config file, the user file
            Config().close()
        return redirect(request.referrer)
    if command == 'list' and request.method == 'GET':
        from os import listdir
        from os.path import isfile, join, splitext

        files = [f for f in listdir(Config().get('config_path', CONFIG_PATH)) if isfile(join(Config().get('config_path', CONFIG_PATH), f))]
        users = [f for f in files if splitext(f)[1].lower() == '.cfg']
        if Config().get('config_path', CONFIG_PATH) == CONFIG_PATH:
            users = [splitext(f)[0] for f in users if f.lower() != DEFAULT_CONFIG_PATH]
        else: users = [splitext(f)[0] for f in users]
        users.append('admin')
        users.sort()

        return jsonify(users=users)
    abort(405) # Not allowed

# Paths for video streaming
@app.route('/video')
def handle_video():
    return """<html><head><style type='text/css'> body { background-image: url(/video/stream/SD); background-repeat:no-repeat; background-position:center top; background-attachment:fixed; height:100% } </style></head><body>&nbsp;</body></html>"""

@app.route('/video/snapshot/<definition>')
def video_snapshot(definition):
    if definition not in app.bot.streamers.keys(): abort(404) # Not found
    frame = utils.cv.JPEGencode(app.bot.streamers[definition].frame)
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/jpeg'
    response.headers['Content-Disposition'] = 'attachment; filename=snapshot.jpg'
    return response

@app.route("/video/stream/<definition>")
def handle_video_stream(definition):
    if not definition in app.bot.streamers.keys(): abort(404) # Not found
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
        abort(404) # Not found
    return jsonify(result=True)

# Path for Sound API
@app.route("/bot/sound/<command>", methods=['GET'])
def handle_bot_sound(command):
    if not command in ['play', 'say']: abort(404) # Not found
    if command == 'play': snd = request.args.get('filename')
    else:                 snd = request.args.get('what')
    if snd is not None:
        getattr(app.bot.sound, command)(snd)
        return jsonify(result=True)
    abort(400) # Bad Request

# Path for Camera API
@app.route("/bot/camera/<command>")
def handle_bot_camera(command):
    if not command in ['capture', 'start_recording', 'stop_recording']: abort(404) # Not found
    if command == 'stop_recording':
        app.bot.camera.stop_recording()
    else: # start_recording or capture
        filename = request.args.get('filename')
        # size = request.args.get('size')
        # Or : size = (request.args.get('width|i'), request.args.get('height|i'))
        getattr(app.bot.camera, command)(filename)
    return jsonify(result=True)

# Path for system API control
@app.route("/system/<command>", methods=['GET'])
def handle_system(command):
    from os import system
    if not command in ['halt', 'reboot', 'restart']: abort(404) # Not found
    if command == 'restart':
        os.system ('sudo service coderbot restart')
    else:
        os.system ("sudo %s" % command)

# Path for DCIM API control
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
        try: unlink(join(Config().get('record_path', RECORD_PATH), filename))
        except: abort(500) # Internal error
        return jsonify(result=True)
    return send_file(join(Config().get('record_path', RECORD_PATH), filename))

# Path for program API control
@app.route("/program")
def handle_programs():
    action = request.args.get('action')
    if action is None:
        return jsonify(result=True, files=Program.listdir())
    abort(501) # Not implemented
@app.route("/program/<filename>", methods=['GET', 'POST'])
def handle_program(filename):
    action = request.form.get('action', request.args.get('action'))
    if action is None and request.method == 'POST': abort(405) # Not allowed
    if not action in [None, 'save', 'save as', 'delete', 'exec', 'abort', 'status']: abort(400) # Bad request
    if action == 'save as':
        overwrite = not (request.form.get('overwrite', '').lower() in ['false', '0', ''])
        try:
            app.program = Program.new(filename, overwrite, request.form.get('dom_code'), request.form.get('py_code'))
            app.program.save()
        except OSError as e:
            if e.errno == errno.EEXIST: return jsonify(result=False, error='File exists', filename=filename)
            else: raise
        return jsonify(result=True, filename=filename)
    if action == 'save':
        if app.program is None: abort(410) # Gone
        app.program.update(request.form.get('dom_code'), request.form.get('py_code'))
        app.program.save()
        return jsonify(result=True)
    if action == 'exec':
        if app.program is None: abort(410) # Gone
        app.program.update(request.form.get('dom_code'), request.form.get('py_code'))
        if Config().get('program_autosave_on_run', False): app.program.save()
        return jsonify(result=app.program.start())
    if action == 'abort':
        if app.program is None: abort(410) # Gone
        app.program.stop()
        return jsonify(result=True)
    if action == 'status':
        if app.program is None: abort(410) # Gone
        return jsonify(status=app.program.isRunning())
    if action is None:
        try: app.program = Program.load(filename)
        except OSError as e:
            if e.errno == errno.ENOENT: abort(404) # File not found
            else: raise
        return jsonify(app.program.get())
    abort(501) # Not implemented



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

