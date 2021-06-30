import { Client, GuildChannel } from 'discord.js';
import { fetchVoiceChannel, login, playInChannel } from './discord';

import { config } from './config';

export async function joinAndPlaySound() {
  console.log('Joining and playing sound');
  console.log('Creating a client');
  const client = new Client();
  console.log('Client created logging in');
  await login(client, config.BOT_TOKEN);
  console.log('Logged in, finding voice channel');
  const voiceChannel = await fetchVoiceChannel(client, config.VOICE_CHANNEL_ID);
  console.log('Voice channel found, checking if sound should be played');
  if (shouldPlaySound(voiceChannel)) {
    console.log('Sound should be played, playing sound');
    await playInChannel(voiceChannel, config.SOUND_FILE_PATH);
  } else {
    console.log('Sound should not be played');
  }
}

function shouldPlaySound(channel: GuildChannel) {
  console.log('Checking if sound should be played');
  const result = !!channel.members.size;
  console.log('Should be played:', result);
  return result;
}

function exit(code: number = 0) {
  console.log('Exiting');
  process.exit(code);
}
