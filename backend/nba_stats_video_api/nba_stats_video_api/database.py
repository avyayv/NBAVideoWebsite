import json
import os

import sqlalchemy
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from functools import lru_cache

from nba_stats_video_api import orm

load_dotenv()  # take environment variables from .env.


def init_tcp_connection_engine():
    db_user = os.environ["DB_USER"]
    db_pass = os.environ["DB_PASS"]
    db_name = os.environ["DB_NAME"]
    db_socket_dir = os.environ.get("DB_SOCKET_DIR", "/cloudsql")
    cloud_sql_connection_name = os.environ["CLOUD_SQL_CONNECTION_NAME"]

    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL.create(
            drivername="postgresql+pg8000",
            username=db_user,  # e.g. "my-database-user"
            password=db_pass,  # e.g. "my-database-password"
            database=db_name,  # e.g. "my-database-name"
            query={
                "unix_sock": "{}/{}/.s.PGSQL.5432".format(
                    db_socket_dir, cloud_sql_connection_name  # e.g. "/cloudsql"
                )  # i.e "<PROJECT-NAME>:<INSTANCE-REGION>:<INSTANCE-NAME>"
            },
        ),
    )
    pool.dialect.description_encoding = None

    return pool 

@lru_cache
def get_name_to_id(pool, player_or_team: str):
    with pool.connect() as con:
        res = con.execute(f"SELECT DISTINCT \"{player_or_team}_ID\", \"{player_or_team}_NAME\" FROM videos;")
        name_to_id = {}
        for r in res:
            if r[f"{player_or_team}_NAME"] != None:
                name_to_id[r[f"{player_or_team}_NAME"]] = r[f"{player_or_team}_ID"]

        return name_to_id 

def execute_query(pool, player_id: str, team_id: str):
    
    Session = sessionmaker(bind=pool)
    session = Session()

    all_vids = session.query(orm.Videos)

    if player_id != None:
        all_vids = all_vids.filter(orm.Videos.PLAYER_ID == int(player_id)) 

    if team_id != None:
        all_vids = all_vids.filter(orm.Videos.TEAM_ID == int(team_id))

    return [vid.as_dict() for vid in all_vids]
