import { RegisterResetPasswordService } from '@/modules/queue/services/register-reset-password-queue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterResetPasswordUseCase {
    constructor(
      private readonly sendResetPasswordQueueService: RegisterResetPasswordService
    ){}
    async execute ({email}: {email: string}) {
      return this.sendResetPasswordQueueService.send({ email })
    }
}
