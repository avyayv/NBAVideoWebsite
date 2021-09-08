FROM python:3.9-slim
ENV FLASK_APP nba_stats_video_api
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD exec gunicorn --bind :5000 --workers 1 --threads 8 --timeout 0 nba_stats_video_api:app
EXPOSE 5000
