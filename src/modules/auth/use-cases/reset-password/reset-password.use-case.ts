import { Injectable, BadRequestException } from '@nestjs/common';
import { ResetPasswordRequestDto } from '../../dtos/reset-password/reset-password-request.dto';
import { FindResetPasswordByTokenUseCase, UpdateExpiresAtUseCase } from '@/modules/reset-password-tokens/use-cases';
import { createHash } from 'crypto';
import { ResetUserPasswordUseCase } from '@/modules/users/use-cases';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly findResetPasswordByTokenUseCase: FindResetPasswordByTokenUseCase,
    private readonly resetUserPasswordUseCase: ResetUserPasswordUseCase,
    private readonly updateExpiresAtUseCase: UpdateExpiresAtUseCase,

    
  ){}

  async execute({ token, password }: ResetPasswordRequestDto) {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const resetToken = await this.findResetPasswordByTokenUseCase.execute(hashedToken);

    if (!resetToken) {
      throw new BadRequestException('Token inválido ou expirado');
    }
    await this.resetUserPasswordUseCase.execute({password, user_id: resetToken.user_id})
    await this.updateExpiresAtUseCase.execute({token_id: resetToken.id})

    return {
      messages: "Senha atualizada com sucesso !"
    }
  }
}
