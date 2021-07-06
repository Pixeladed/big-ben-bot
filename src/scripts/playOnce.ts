import { joinAndPlaySound } from '../bot';
import { logger } from '../log';

async function playOnce() {
  logger.info('Joining and playing sound');
  await joinAndPlaySound();
  exit();
}

function exit(code: number = 0) {
  logger.info('Exiting');
  process.exit(code);
}

playOnce();

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
