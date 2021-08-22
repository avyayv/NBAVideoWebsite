import flask
from flask import jsonify, request

from nba_stats_video_api import database

app = flask.Flask(__name__)

pool = database.init_tcp_connection_engine()


@app.route("/", methods=["GET"])
def home():

    player_id = request.args.get("player_id")
    team_id = request.args.get("team_id")
    made_shot = request.args.get("made_shot")

    where_clause = ""

    if player_id != None:
        where_clause += f'"PLAYER_ID" = {player_id}'

    if team_id != None:
        if where_clause != "":
            where_clause += " AND "
        where_clause += f'"TEAM_ID" = {team_id}'

    if made_shot != None:
        if where_clause != "":
            where_clause += " AND "
        where_clause += f'"SHOT_MADE_FLAG" = {made_shot}'

    if where_clause != "":
        where_clause = f" WHERE {where_clause}"

    response_dict = database.execute_query(
        f"SELECT * FROM videos {where_clause};", pool
    )

    response = jsonify(response_dict)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return response 

if __name__ == "__main__":
    app.run()
