import { Client } from 'discord.js'
import { config } from './config'

const client = new Client()

client.login(config.BOT_TOKEN)
