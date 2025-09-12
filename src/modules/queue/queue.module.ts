import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RegisterResetPasswordService } from './services/register-reset-password-queue.service';
import { AuthQueueProcessor } from './processors/auth.processor';
import { ResetPasswordProcessor } from './processors/reset-password/reset-password.processor';
import { UsersModule } from '../users/users.module';
import { NotificationProcessor } from './processors/notification/notification.processor';
import { RegisterNotificationService } from './services/register-notification.service';
import { EmailsModule } from '../emails/emails.module';
import { ResetPasswordModule } from '../reset-password/reset-password.module';

@Global()
@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'whatsapp-auth-code' },
      { name: 'reset-password' },
      { name: 'notification' },
    ),
    UsersModule,
    EmailsModule,
    ResetPasswordModule
  ],
  providers: [RegisterResetPasswordService, AuthQueueProcessor, ResetPasswordProcessor, NotificationProcessor, RegisterNotificationService],
  exports: [RegisterResetPasswordService, RegisterNotificationService],
})
export class QueueModule {}
