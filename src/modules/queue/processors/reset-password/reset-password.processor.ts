import { ForgetPasswordRequestUseCase } from '@/modules/reset-password/use-cases';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { ClsService } from 'nestjs-cls';

@Processor('reset-password')
export class ResetPasswordProcessor {
  constructor(
    private readonly forgetPasswordRequestUseCase: ForgetPasswordRequestUseCase,
    private readonly cls: ClsService,
  ) {}

  @Process('register-reset-password')
  async process(job: Job<any>): Promise<any> {
    try {
      return await this.cls.run(async () => {
        await this.cls.set('tenantId', job.data.tenant_id);
        await this.forgetPasswordRequestUseCase.execute({
          email: job.data.email,
          tenant_id: job.data.tenant_id,
        });

        return { success: true };
      });
    } catch (error) {
      console.error('Erro ao processar reset-password:', error);
      throw error;
    }
  }
}