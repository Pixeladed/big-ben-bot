import { Channel, Client, VoiceChannel } from 'discord.js';

import { logger } from './log';

export async function login(client: Client, token: string) {
  try {
    logger.log('Logging in');
    await new Promise<void>((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
      client.login(token);
    });
    logger.log('Logged in');
  } catch (error) {
    logger.error('Login failed');
    throw error;
  }
}

export async function fetchVoiceChannel(client: Client, channelId: string) {
  try {
    logger.log('Fetching channel');
    const channel = client.channels.cache.get(channelId);
    logger.log('Got channel, checking type');
    if (!isVoiceChannel(channel)) {
      throw new Error('Provided channel is not a voice channel');
    }
    logger.log('Verified channel is a voice channel');
    return channel;
  } catch (error) {
    logger.error('Unable to fetch voice channel');
    throw error;
  }
}

function isVoiceChannel(channel: Channel): channel is VoiceChannel {
  return channel.type === 'voice';
}

export async function playInChannel(channel: VoiceChannel, soundPath: string) {
  try {
    logger.log('Joining channel');
    const connection = await channel.join();
    logger.log('Joined channel, playing sound');
    const player = new Promise((resolve, reject) => {
      const stream = connection.play(soundPath);
      stream.on('error', reject);
      stream.on('finish', resolve);
    });
    await player;
    logger.log('Finished playing sound, disconnecting');
    connection.disconnect();
    logger.log('Disconnected');
  } catch (error) {
    logger.error('Could not play sound in channel');
    throw error;
  }
}
