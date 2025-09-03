import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => {
        const host = process.env.REDIS_HOST || 'localhost';
        const port = Number(process.env.REDIS_PORT || 6379);
        return new Redis({
          host,
          port,
          username: process.env.REDIS_USER || undefined,
          password: process.env.REDIS_PASSWORD || undefined,
          tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
          retryStrategy: (times) => {
            return Math.min(times * 100, 2000);
          },
          reconnectOnError: (err) => {
            const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
            if (targetErrors.some(e => err.message.includes(e))) {
              return true;
            }
            return false;
          },
          maxRetriesPerRequest: 3,
        });
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
