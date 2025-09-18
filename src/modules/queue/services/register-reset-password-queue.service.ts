import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class RegisterResetPasswordService {
  constructor( @InjectQueue('reset-password')
    private readonly resetPasswordQueue: Queue,) {}

  async send ({email, tenant_id }: {email: string; tenant_id: string}): Promise<any> {
    console.log('Enviando job para fila de reset-password com tenant_id:', tenant_id);
    return this.resetPasswordQueue.add(
      'register-reset-password',
      { email, tenant_id },
      {
        attempts: 5,
        backoff: 5000,
      },
    );
  }
}
