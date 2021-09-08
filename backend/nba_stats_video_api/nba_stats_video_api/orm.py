from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, BigInteger, Integer, String

Base = declarative_base()
class Videos(Base):

    __tablename__ = 'videos'

    GAME_ID = Column(BigInteger, primary_key=True)
    GAME_EVENT_ID = Column(Integer, primary_key=True)
    PLAYER_ID = Column(BigInteger)
    PLAYER_NAME = Column(String(32))
    Description = Column(String(64))
    TEAM_ID = Column(String(32))
    TEAM_NAME = Column(String(32))
    SHOT_TYPE = Column(String(32))
    SHOT_DISTANCE = Column(Integer)
    LOC_X = Column(Integer)
    LOC_Y = Column(Integer)
    SHOT_ATTEMPTED_FLAG = Column(Integer)
    SHOT_MADE_FLAG = Column(Integer)
    HTM = Column(String(16))
    VTM = Column(String(16))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
