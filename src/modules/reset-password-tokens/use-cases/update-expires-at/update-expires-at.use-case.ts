import { Injectable } from '@nestjs/common';
import { ResetPasswordTokensRepository } from '../../repositories/implementation/reset-password-tokens.repository';

@Injectable()
export class UpdateExpiresAtUseCase {
  constructor(
    private readonly resetPasswordTokens: ResetPasswordTokensRepository
  ){}
  execute({ token_id }: { token_id: string; }) {
    return this.resetPasswordTokens.updateExpiresAt(token_id)
  }
}
