import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import axios from 'axios';

@Processor('whatsapp-auth-code')
export class AuthQueueProcessor  {
  constructor(
  ){
  }

  @Process('send-whatsapp-code')
  async process(job: Job<any>): Promise<any> {
  }
}
