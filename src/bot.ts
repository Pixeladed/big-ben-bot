import { Client, GuildChannel } from 'discord.js';
import { fetchVoiceChannel, login, playInChannel } from './discord';

import { config } from './config';

export async function joinAndPlaySound() {
  try {
    const client = new Client();
    await login(client, config.BOT_TOKEN);
    const voiceChannel = await fetchVoiceChannel(
      client,
      config.VOICE_CHANNEL_ID
    );
    if (shouldPlaySound(voiceChannel)) {
      await playInChannel(voiceChannel, config.SOUND_FILE_PATH);
    }
  } catch (error) {
    console.error(error);
    exit(1);
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
