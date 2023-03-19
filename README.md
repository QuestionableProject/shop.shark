Website for a course project based on a design from the Internet.

DESIGN -- https://dribbble.com/shots/14210110-Fishing

## How to start?
<b>Download node</b> <br>
<b>Install pnpm</b> <br>
   
<b>Start Frontend</b> <br>
- cd app <br>
- pnpm run dev

<b>Start Backend</b> <br>
- cd server <br>
- create a `.env` file or edit `.env.example` add your database data
```
    WEBSITEPORT="The site that is allowed cors access"
    PORT="Server startup port"
    DB_NAME=""
    DB_USER=""
    DB_PASSWORD=""
    DB_HOST=""
    DB_PORT= 
    SECRET_KEY=Secret key for JWT
```
- pnpm run dev
