import flask
from flask import jsonify, request

from nba_stats_video_api import database

app = flask.Flask(__name__)

pool = database.init_tcp_connection_engine()


@app.route("/videos", methods=["GET"])
def home():

    player_id = request.args.get("player_id")
    team_id = request.args.get("team_id")
    made_shot = request.args.get("made_shot")

    response_dict = database.execute_query(pool, player_id, team_id)

    response = jsonify(response_dict)
    response.headers.add('Access-Control-Allow-Origin', 'https://film.analyzeball.com')

    return response 

@app.route("/players", methods=["GET"])
def players():

    response_dict = database.get_name_to_id(pool, "PLAYER")
    response = jsonify(response_dict)
    response.headers.add('Access-Control-Allow-Origin', 'https://film.analyzeball.com')

    return response 

@app.route("/teams", methods=["GET"])
def teams():

    response_dict = database.get_name_to_id(pool, "TEAM")
    response = jsonify(response_dict)
    response.headers.add('Access-Control-Allow-Origin', 'https://film.analyzeball.com')

    return response 

if __name__ == "__main__":
    app.run()
