import json
import time
from typing import List

import pandas as pd
import requests
import numpy as np

from nba_stats_video_scraper import database


class VideoScraper:
    def __init__(self):

        self.seasons = ["2018-19", "2019-20", "2020-21"]
        self.season_types = ["Regular+Season", "PlayIn", "Playoffs"]
        self.context_measures = ["FGA"] #, "PF", "REB", "TOV"]

        self.headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-us",
            "Connection": "keep-alive",
            'Cache-Control': 'no-cache',
            "If-Modified-Since": "Sun, 22 Aug 2021 00:26:57 GMT",
            "Origin": "https://www.nba.com",
            "Referer": "https://www.nba.com/stats/players/",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
            "x-nba-stats-origin": "stats",
            "x-nba-stats-token": "true",
        }


    def get_video_url(self, team_id: str, season: str, season_type: str, context_measure: str) -> str:
        url = (
            "https://stats.nba.com/stats/videodetailsasset?AheadBehind=&CFID=33"
            + f"&CFPARAMS={season}&ClutchTime=&Conference=&ContextFilter=&ContextMeasure={context_measure}" #FGA
            + "&DateFrom=&DateTo=&Division=&EndPeriod=10&EndRange=28800&GROUP_ID=&GameEventID=&GameID="
            + "&GameSegment=&GroupID=&GroupMode=&GroupQuantity=5&LastNGames=0&LeagueID=00&"
            + f"Location=&Month=0&OnOff=&OpponentTeamID=0&Outcome=&PORound=0&Period=0&PlayerID=0"
            + "&PlayerID1=&PlayerID2=&PlayerID3=&PlayerID4=&PlayerID5=&PlayerPosition=&PointDiff="
            + f"&Position=&RangeType=0&RookieYear=&Season={season}&SeasonSegment=&"
            + f"SeasonType={season_type}&ShotClockRange=&StartPeriod=1&StartRange=0"
            + f"&StarterBench=&TeamID={team_id}&VsConference=&VsDivision=&VsPlayerID1=&VsPlayerID2"
            + "=&VsPlayerID3=&VsPlayerID4=&VsPlayerID5=&VsTeamID="
        )
        return url

    def get_teams_url(self, season: str) -> str:
        return (
            "https://stats.nba.com/stats/leaguedashplayerstats?College="
            + "&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick="
            + "&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00"
            + "&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome="
            + "&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience="
            + f"&PlayerPosition=&PlusMinus=N&Rank=N&Season={season}&SeasonSegment="
            + "&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0"
            + "&TwoWay=0&VsConference=&VsDivision=&Weight="
        )

    def get_shot_chart_url(self, team_id: str, season: str, season_type: str, context_measure: str) -> str:
        return (
            "https://stats.nba.com/stats/shotchartdetail?AheadBehind=&CFID=33"
            + f"&CFPARAMS={season}&ClutchTime=&Conference=&ContextFilter=&ContextMeasure={context_measure}"
            + "&DateFrom=&DateTo=&Division=&EndPeriod=10&EndRange=28800&GROUP_ID="
            + "&GameEventID=&GameID=&GameSegment=&GroupID=&GroupMode=&GroupQuantity=5"
            + "&LastNGames=0&LeagueID=00&Location=&Month=0&OnOff=&OpponentTeamID=0"
            + f"&Outcome=&PORound=0&Period=0&PlayerID=0&PlayerID1=&PlayerID2=&PlayerID3="
            + "&PlayerID4=&PlayerID5=&PlayerPosition=&PointDiff=&Position=&RangeType=0"
            + f"&RookieYear=&Season={season}&SeasonSegment=&SeasonType={season_type}&"
            + f"ShotClockRange=&StartPeriod=1&StartRange=0&StarterBench=&TeamID={team_id}"
            + "&VsConference=&VsDivision=&VsPlayerID1=&VsPlayerID2=&VsPlayerID3="
            + "&VsPlayerID4=&VsPlayerID5=&VsTeamID="
        )

    def get_all_teams(self, season: str) -> List[int]:
        res = requests.get(self.get_teams_url(season), headers=self.headers)
        df = pd.DataFrame(
            res.json()["resultSets"][0]["rowSet"],
            columns=res.json()["resultSets"][0]["headers"],
        )
        return list(df["TEAM_ID"].unique())

    def get_videos_df(self, season: str, season_type: str, context_measure: str) -> pd.DataFrame:

        teams = self.get_all_teams(season)

        all_teams_df = pd.DataFrame()

        team_to_number_of_attempts = {}

        for team in teams:

            try:
                team_video_url = self.get_video_url(team, season, season_type, context_measure)

                time.sleep(2)
                team_video_json = requests.get(
                    team_video_url, headers=self.headers
                ).json()

                requests.session().close()

                url_dicts = team_video_json["resultSets"]["Meta"]["videoUrls"]

                team_dicts = []
                for i, url_dict in enumerate(url_dicts):
                    video_metadata = team_video_json["resultSets"]["playlist"][i]
                    video_url = url_dict["lurl"]
                    video_dict = {
                        "TeamID": team,
                        "GameID": video_metadata["gi"],
                        "EventID": video_metadata["ei"],
                        "GameDate": video_metadata["gc"],
                        "Description": video_metadata["dsc"],
                        "HomeTeam": video_metadata["ha"],
                        "AwayTeam": video_metadata["va"],
                        "HomeTeamScore": video_metadata["hpa"],
                        "AwayTeamScore": video_metadata["vpa"],
                        "VideoURL": video_url,
                    }
                    team_dicts.append(video_dict)

                team_video_df = pd.DataFrame(team_dicts)

                if len(team_video_df) == 0:
                    continue

                shot_chart_url = self.get_shot_chart_url(team, season, season_type, context_measure)
                shot_chart_json = requests.get(
                    shot_chart_url, headers=self.headers
                ).json()
                time.sleep(2)

                shot_chart_df = pd.DataFrame(
                    shot_chart_json["resultSets"][0]["rowSet"],
                    columns=shot_chart_json["resultSets"][0]["headers"],
                )

                columns = [
                    "GameID",
                    "EventID",
                    "GameDate",
                    "Season",
                    "PLAYER_ID",
                    "PLAYER_NAME",
                    "Description",
                    "TEAM_ID",
                    "TEAM_NAME",
                    "ACTION_TYPE",
                    "SHOT_DISTANCE",
                    "LOC_X",
                    "LOC_Y",
                    "SHOT_MADE_FLAG",
                    "VideoURL",
                    "HomeTeam",
                    "AwayTeam",
                    "HomeTeamScore",
                    "AwayTeamScore",
                    "ScoreDiff",
                    "SecondsRemaining",
                ]

                full_team_df = pd.merge(
                    team_video_df,
                    shot_chart_df,
                    how="left",
                    left_on=["GameID", "EventID"],
                    right_on=["GAME_ID", "GAME_EVENT_ID"],
                )

                full_team_df["OtherPeriodsSecRemaining"] = np.max(4 - full_team_df["PERIOD"], 0)

                full_team_df["SecondsRemaining"] = \
                    (full_team_df["OtherPeriodsSecRemaining"] * 12 * 60) + \
                    full_team_df["MINUTES_REMAINING"] * 60 + \
                    full_team_df["SECONDS_REMAINING"]
                
                team_id_to_abbr = {1610612737: 'ATL', 1610612738: 'BOS', 1610612751: 'BKN', 1610612766: 'CHA', 1610612741: 'CHI', 1610612739: 'CLE', 1610612742: 'DAL', 1610612743: 'DEN', 1610612765: 'DET', 1610612744: 'GSW', 1610612745: 'HOU', 1610612754: 'IND', 1610612746: 'LAC', 1610612747: 'LAL', 1610612763: 'MEM', 1610612748: 'MIA', 1610612749: 'MIL', 1610612750: 'MIN', 1610612740: 'NOP', 1610612752: 'NYK', 1610612760: 'OKC', 1610612753: 'ORL', 1610612755: 'PHI', 1610612756: 'PHX', 1610612757: 'POR', 1610612758: 'SAC', 1610612759: 'SAS', 1610612761: 'TOR', 1610612762: 'UTA', 1610612764: 'WAS'}

                full_team_df["TeamAbbr"] = full_team_df["TEAM_ID"].map(team_id_to_abbr)
                full_team_df["PlayerIsHomeTeam"] = (full_team_df["TeamAbbr"] == full_team_df["HomeTeam"]).astype(int).replace(0, -1)
                full_team_df["ScoreDiff"] = full_team_df["PlayerIsHomeTeam"] * (full_team_df["HomeTeamScore"] - full_team_df["AwayTeamScore"])

                full_team_df["Season"] = season 

                all_teams_df = pd.concat([all_teams_df, full_team_df])[columns]

                print(f"{team} worked")

                time.sleep(0.5)

            except (json.JSONDecodeError, requests.exceptions.ChunkedEncodingError) as error:
                print(f"{team} gave an {error}")

                if team in team_to_number_of_attempts:
                    team_to_number_of_attempts[team] += 1 
                else:
                    team_to_number_of_attempts[team] = 1

                if team_to_number_of_attempts[team] < 10:
                    teams.append(team)

                continue

        return all_teams_df

    def scrape_all_data(self):

        engine = database.init_tcp_connection_engine()

        self.all_data = pd.DataFrame()

        for context_measure in self.context_measures:
            for season in self.seasons:
                for season_type in self.season_types:
                    print(context_measure, season, season_type)
                    season_season_type_df = self.get_videos_df(season, season_type, context_measure)
                    self.all_data = pd.concat([self.all_data, season_season_type_df])

            self.all_data.to_sql("videos", engine, chunksize=5000, if_exists='replace', method='multi')

        print("Success!")
