import { Client } from 'discord.js'
import { config } from './config'

const client = new Client()

const main = async () => {
  console.log('Logging with BOT_TOKEN')
  await client.login(config.BOT_TOKEN)
  console.log('Logged in')
}

const exit = () => {
  console.log('Exiting')
  process.exit(0)
}

main()

process.on('SIGINT', exit)
process.on('SIGTERM', exit)
