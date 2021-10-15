# Big Ben Bot

Big Ben Bot for Discord, when combined with a cron job that runs every hour, it goes into a designated channel and a clock bong and then leaves.

### Get started

1. Install dependencies

```bash
npm install
```

2. Create and populate a `.env` file

Create a file called .env in the root directory and fill it with the following content

```dotenv
BOT_TOKEN=YOUR DISCORD BOT TOKEN
VOICE_CHANNEL_ID=THE ID OF THE DESIGNATED VOICE CHANNEL
```

3. Run the bot

```bash
npm start
```

### Deploying on Heroku

A `Procfile` is provided at the root of the codebase for deploying to Heroku. By default it starts a process called `worker` that starts the cron server and execute the bot every hour with credentials taken from the environment which you can manage in Heroku