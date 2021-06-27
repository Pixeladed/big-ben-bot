import { Client, GuildChannel } from 'discord.js';
import { fetchVoiceChannel, login, playInChannel } from './discord';

import { config } from './config';

async function main() {
  const client = new Client();
  await login(client, config.BOT_TOKEN);
  const voiceChannel = await fetchVoiceChannel(client, {
    guildId: config.GUILD_ID,
    channelId: config.VOICE_CHANNEL_ID,
  });
  if (shouldPlaySound(voiceChannel)) {
    await playInChannel(voiceChannel, config.SOUND_FILE_NAME);
  }
}

function shouldPlaySound(channel: GuildChannel) {
  return !!channel.members.size;
}

function exit() {
  console.log('Exiting');
  process.exit(0);
}

main();

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
