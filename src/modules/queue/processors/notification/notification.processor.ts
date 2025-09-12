import { EmailService } from '@/modules/emails/services/email.service';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';


interface ResetPasswordJobData {
  email: string;
  user_name: string;
  token: string;
}


@Processor('notification')
export class NotificationProcessor  {
  constructor(private readonly emailService: EmailService) {}


  @Process('reset-password-email')
  async process(job: Job<ResetPasswordJobData>): Promise<void> {
    try {
      await this.emailService.sendResetPasswordEmail({ to: job.data.email, user_name: job.data.user_name, token: job.data.token });
    } catch (error) {
      console.error('Erro ao processar reset-password:', error);
      throw error;
    }
  }
}