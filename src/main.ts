import { Client } from 'discord.js';
import { config } from './config';
import { login } from './bot';

const client = new Client();

const main = async () => {
  await login(client, config.BOT_TOKEN);
};

const exit = () => {
  console.log('Exiting');
  process.exit(0);
};

main();

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
