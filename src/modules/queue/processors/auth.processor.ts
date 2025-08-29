import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import axios from 'axios';
import { WhatsappService } from '@/modules/meta/services/whatsapp-business/whatsapp-business.service';

@Processor('whatsapp-auth-code')
export class AuthQueueProcessor  {
  constructor(
    private readonly whatsappService: WhatsappService
  ){
  }

  @Process('send-whatsapp-code')
  async process(job: Job<any>): Promise<any> {
    const { phone, code } = job.data;
    try {
      await this.whatsappService.sendTemplateMessage({to: phone, message: code})
      return { success: true };
    } catch (err) {
      throw err;
    }
  }
}
