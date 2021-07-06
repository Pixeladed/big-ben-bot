import { CronJob } from 'cron';
import { config } from './config';
import { joinAndPlaySound } from './bot';
import { logger } from './log';

logger.info('Creating cron job');
const job = new CronJob(config.SCHEDULE, async () => {
  logger.info('Cron job running');
  await joinAndPlaySound();
  logger.success('Cron job finished');
});
logger.info('Cron job created, starting');
job.start();
logger.success('Cron job started');

process.on('uncaughtException', (error) => {
  logger.fatal('Uncaught exception thrown, exiting', error);
  process.exit(1);
});
