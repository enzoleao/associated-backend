import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MetaModule } from '../meta/meta.module';
import { SendAuthCodeQueueService } from './services/send-auth-code-queue.service';
import { AuthQueueProcessor } from './processors/auth.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'whatsapp-auth-code',
    }),
    MetaModule,
  ],
  providers: [SendAuthCodeQueueService, AuthQueueProcessor],
  exports: [SendAuthCodeQueueService],
})
export class QueueModule {}