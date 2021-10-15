import { Channel, Client, VoiceChannel } from 'discord.js';

import { logger } from './log';

/**
 * Authenticate a discord.js client with the provided token
 * @throws if the token is invalid
 */
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

/**
 * Get a voice channel from an authenticated client given a channel id
 * @throws if the channel id is invalid or if it is not a voice channel
 * @returns the voice channel
 */
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

/**
 * Check whether a channel is a voice channel (as opposed to a text channel)
 * @returns whether or not the channel is a voice channel
 */
function isVoiceChannel(channel: Channel): channel is VoiceChannel {
  return channel.type === 'voice';
}

/**
 * Join the bot into the specified channel and play the given audio file
 * @throws if the audio file is invalid or the channel is invalid
 */
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
