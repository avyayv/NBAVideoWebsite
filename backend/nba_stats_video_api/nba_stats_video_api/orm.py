from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, BigInteger, Integer, String

Base = declarative_base()
class Videos(Base):

    __tablename__ = 'videos'

    GameID = Column(BigInteger, primary_key=True)
    GameEventID = Column(Integer, primary_key=True)
    GameDate = Column(String(32))
    Season = Column(String(8))
    PLAYER_ID = Column(BigInteger)
    PLAYER_NAME = Column(String(32))
    Description = Column(String(64))
    TEAM_ID = Column(String(32))
    TEAM_NAME = Column(String(32))
    ACTION_TYPE = Column(String(32))
    SHOT_DISTANCE = Column(Integer)
    LOC_X = Column(Integer)
    LOC_Y = Column(Integer)
    SHOT_MADE_FLAG = Column(Integer)
    HomeTeam = Column(String(16))
    AwayTeam = Column(String(16))
    VideoURL = Column(String(256))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
