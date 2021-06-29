import * as path from 'path';

function ensure(value: string | undefined): string {
  if (value == undefined) {
    throw new Error('Value does not exist');
  }
  return value;
}

export const config = {
  BOT_TOKEN: ensure(process.env.BOT_TOKEN),
  VOICE_CHANNEL_ID: ensure(process.env.VOICE_CHANNEL_ID),
  SOUND_FILE_PATH: path.resolve('src/sound.mp3'),
};
