import { Injectable } from '@nestjs/common';
import { ResetPasswordTokensRepository } from '../../repositories/implementation/reset-password-tokens.repository';

@Injectable()
export class FindResetPasswordByTokenUseCase {
  constructor(
    private readonly resetPasswordTokensRepository: ResetPasswordTokensRepository
  ){}
  execute(token: string) {
    return this.resetPasswordTokensRepository.findResetPasswordByToken(token)
  }
}
