import { Client, GuildChannel, VoiceChannel } from 'discord.js';

export async function login(client: Client, token: string) {
  try {
    console.log('Logging in');
    await client.login(token);
    console.log('Logged in');
  } catch (error) {
    console.log('Login failed');
    throw error;
  }
}

export async function fetchVoiceChannel(
  client: Client,
  options: {
    guildId: string;
    channelId: string;
  }
) {
  try {
    const guild = await fetchGuild(client, options.guildId);
    console.log('Fetching channel');
    const channel = guild.channels.cache.get(options.channelId);
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

function isVoiceChannel(channel: GuildChannel): channel is VoiceChannel {
  return channel.type === 'voice';
}

async function fetchGuild(client: Client, guildId: string) {
  try {
    console.log('Fetching guild');
    const guild = await client.guilds.fetch(guildId);
    console.log('Fetched guild');
    return guild;
  } catch (error) {
    console.log('Unable to fetch guild');
    throw error;
  }
}

export async function playInChannel(channel: VoiceChannel, soundPath: string) {
  try {
    console.log('Joining channel');
    const connection = await channel.join();
    console.log('Joined channel, playing sound');
    const player = new Promise((resolve, reject) => {
      const stream = connection.play(soundPath);
      stream.on('error', reject);
      stream.on('finish', resolve);
    });
    await player;
    console.log('Finished playing sound, disconnecting');
    connection.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.log('Could not play sound in channel');
    throw error;
  }
}
