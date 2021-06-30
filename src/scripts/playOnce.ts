import { joinAndPlaySound } from '../bot';

async function playOnce() {
  await joinAndPlaySound();
  exit();
}

function exit(code: number = 0) {
  console.log('Exiting');
  process.exit(code);
}

playOnce();

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
