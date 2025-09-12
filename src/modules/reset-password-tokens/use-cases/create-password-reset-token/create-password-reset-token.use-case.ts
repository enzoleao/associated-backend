import { Injectable } from '@nestjs/common';
import { ResetPasswordTokensRepository } from '../../repositories/implementation/reset-password-tokens.repository';
import { ICreateResetPassword } from '../../interfaces/create-reset-password.interface';

@Injectable()
export class CreatePasswordResetTokenUseCase {
  constructor(
    private readonly resetPasswordTokenRepository: ResetPasswordTokensRepository
  ){}
  execute(data: ICreateResetPassword) {
    return this.resetPasswordTokenRepository.createPasswordResetToken(data)
  }
}
