import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MetaModule } from '../meta/meta.module';
import { SendAuthCodeQueueService } from './services/send-auth-code-queue.service';
import { AuthQueueProcessor } from './processors/auth.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        username: process.env.REDIS_USER || undefined,       
        password: process.env.REDIS_PASSWORD || undefined,    
        },
    }),
    BullModule.registerQueue(
      { name: 'whatsapp-auth-code' },
    ),
    MetaModule,
  ],
  providers: [SendAuthCodeQueueService, AuthQueueProcessor],
  exports: [SendAuthCodeQueueService],
})
export class QueueModule {}