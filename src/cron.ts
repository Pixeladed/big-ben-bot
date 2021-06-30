import { CronJob } from 'cron';
import { config } from './config';
import { joinAndPlaySound } from './bot';

console.log('Creating cron job');
const job = new CronJob(config.SCHEDULE, joinAndPlaySound);
console.log('Cron job created, starting');
job.start();

process.on('uncaughtException', (error) => {
  console.log('Uncaught exception thrown, exiting');
  console.error(error);
  process.exit(1);
});
