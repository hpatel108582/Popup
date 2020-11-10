import os
import flask
import flask_socketio
import json

app = flask.Flask(__name__)


socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

@app.route('/')
def hello():
    return flask.render_template('index.html')


@socketio.on('output')
def on_new_number(data):
    
    print( data)
    title = data['title']
    start=data['start']
    end=data['end']

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
