import { Client, GuildChannel } from 'discord.js';
import { fetchVoiceChannel, login, playInChannel } from './discord';

import { config } from './config';
import { logger } from './log';

export async function joinAndPlaySound() {
  logger.log('Joining and playing sound');
  logger.log('Creating a client');
  const client = new Client();
  logger.log('Client created logging in');
  await login(client, config.BOT_TOKEN);
  logger.log('Logged in, finding voice channel');
  const voiceChannel = await fetchVoiceChannel(client, config.VOICE_CHANNEL_ID);
  logger.log('Voice channel found, checking if sound should be played');
  if (shouldPlaySound(voiceChannel)) {
    logger.log('Sound should be played, playing sound');
    await playInChannel(voiceChannel, config.SOUND_FILE_PATH);
  } else {
    logger.log('Sound should not be played');
  }
}

function shouldPlaySound(channel: GuildChannel) {
  logger.log('Checking if sound should be played');
  const result = !!channel.members.size;
  logger.log('Should be played:', result);
  return result;
}
