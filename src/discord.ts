import { Channel, Client, VoiceChannel } from 'discord.js';

const tts = require('discord-tts');

export async function login(client: Client, token: string) {
  try {
    console.log('Logging in');
    await new Promise<void>((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
      client.login(token);
    });
    console.log('Logged in');
  } catch (error) {
    console.log('Login failed');
    throw error;
  }
}

export async function fetchVoiceChannel(client: Client, channelId: string) {
  try {
    console.log('Fetching channel');
    const channel = client.channels.cache.get(channelId);
    console.log('Got channel, checking type');
    if (!isVoiceChannel(channel)) {
      throw new Error('Provided channel is not a voice channel');
    }
    console.log('Verified channel is a voice channel');
    return channel;
  } catch (error) {
    console.log('Unable to fetch voice channel');
    throw error;
  }
}

function isVoiceChannel(channel: Channel): channel is VoiceChannel {
  return channel.type === 'voice';
}

export async function playInChannel(channel: VoiceChannel, soundPath: string) {
  try {
    console.log('Joining channel');
    const connection = await channel.join();
    console.log('Joined channel, playing sound');
    const player = new Promise((resolve, reject) => {
      const now = new Date().getUTCHours();
      const stream = connection.play(tts.getVoiceStream('bing bong'));
      stream.on('error', reject);
      stream.on('finish', resolve);
    });
    await player;
    connection.play(tts.getVoiceStream('Oi Harry, shut the fuck up'));
    console.log('Finished playing sound, disconnecting');
    connection.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.log('Could not play sound in channel');
    throw error;
  }
}
