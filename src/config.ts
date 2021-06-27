function ensure(value: string | undefined): string {
  if (value == undefined) {
    throw new Error('Value does not exist');
  }
  return value;
}

export const config = {
  BOT_TOKEN: ensure(process.env.BOT_TOKEN),
  GUILD_ID: ensure(process.env.GUILD_ID),
  VOICE_CHANNEL_ID: ensure(process.env.VOICE_CHANNEL_ID),
  SOUND_FILE_NAME: 'sound.mp3',
};
