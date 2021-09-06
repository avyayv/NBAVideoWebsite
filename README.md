# Simple NBA Video Searching Website

With 3ball.io no longer available to view NBA clips, I made a simpler version of the app. I hope to add more features (viewing turnovers, rebounds, etc.) that 3ball.io had, but also add more features that allow users to save clips for future usage (using local storage or similar). 

## Backend
I developed the backend API using Flask. I host the backend using Google Cloud Run. 

Scraping was performed using the requests library. The initial version only scraped the 2020-21 season and did not scrape any information about Game Date, opponent team, etc. However, a more functional version with regards to data will be added soon. 

## Frontend
I created a simple React app which allows the user to input the player name and see all their plays. The UI definitely could use some work.

## Todo
- Scrape more information about each play
- Scrape turnover, rebounds, etc. (what 3ball.io had)
- Save plays (use React router to make it multi page, use local storage to save plays)
- Improve overall UI
