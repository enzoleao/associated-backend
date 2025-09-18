import { RegisterResetPasswordService } from '@/modules/queue/services/register-reset-password-queue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterResetPasswordUseCase {
    constructor(
      private readonly sendResetPasswordQueueService: RegisterResetPasswordService
    ){}
    async execute ({email, tenant_id}: {email: string, tenant_id: string}): Promise<any> {
      return this.sendResetPasswordQueueService.send({ email, tenant_id })
    }
}
