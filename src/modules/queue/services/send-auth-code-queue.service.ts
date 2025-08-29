import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class SendAuthCodeQueueService {
  constructor( @InjectQueue('whatsapp-auth-code')
    private readonly whatsappNotificationsQueue: Queue,) {}

  async send ({phone, code }: {phone: string; code: string; }) {
    return this.whatsappNotificationsQueue.add(
      'send-whatsapp-code',
      { phone, code },
      {
        attempts: 5,
        backoff: 5000,
      },
    );
  }
}
