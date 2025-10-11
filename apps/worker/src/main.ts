import 'dotenv/config';
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { ensurePermission } from '@socialmentorify/shared';

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379');

export const notificationQueue = new Queue('notifications', { connection });

new Worker(
  'notifications',
  async (job) => {
    ensurePermission('ADMIN', 'plan.create');
    console.log('Procesando notificación', job.id, job.data);
  },
  { connection }
);

console.log('Worker de notificaciones listo.');
