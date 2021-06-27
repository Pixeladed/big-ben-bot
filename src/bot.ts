import { Client } from 'discord.js';

export async function login(client: Client, token: string) {
  console.log('Logging in');
  await client.login(token);
  console.log('Logged in');
}
