import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class RegisterNotificationService {
  constructor( @InjectQueue('notification')
    private readonly resetPasswordQueue: Queue,) {}

  async sendResetPasswordQueue ({email, token, user_name }: {email: string; token: string; user_name: string }) {
    return this.resetPasswordQueue.add(
      'reset-password-email',
      { email, token, user_name },
      {
        attempts: 5,
        backoff: 5000,
      },
    );
  }
}
