import { ForgetPasswordRequestUseCase } from '@/modules/reset-password/use-cases';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';

@Processor('reset-password')
export class ResetPasswordProcessor  {
  constructor(
    private readonly forgetPasswordRequestUseCase: ForgetPasswordRequestUseCase
  ){}

  @Process('register-reset-password')
  async process(job: Job<any>): Promise<any> {
    try {
      await this.forgetPasswordRequestUseCase.execute({email: job.data.email})
      return { success: true };
    } catch (error) {
      console.error('Erro ao processar reset-password:', error);
      throw error;
    }
  }
}