import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class RegisterResetPasswordService {
  constructor( @InjectQueue('reset-password')
    private readonly resetPasswordQueue: Queue,) {}

  async send ({email }: {email: string }) {
    return this.resetPasswordQueue.add(
      'register-reset-password',
      { email },
      {
        attempts: 5,
        backoff: 5000,
      },
    );
  }
}
