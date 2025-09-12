import { Injectable, BadRequestException } from '@nestjs/common';
import { FindResetPasswordByTokenUseCase, UpdateExpiresAtUseCase } from '@/modules/reset-password-tokens/use-cases';
import * as crypto from 'crypto';
import { ResetUserPasswordUseCase as ResetPasswordUseCase } from '@/modules/users/use-cases';
import { ResetPasswordRequestDto } from '@/modules/auth/dtos/reset-password/reset-password-request.dto';

@Injectable()
export class ResetUserPasswordUseCase {
  constructor(
    private readonly findResetPasswordByTokenUseCase: FindResetPasswordByTokenUseCase,
    private readonly resetUserPasswordUseCase: ResetPasswordUseCase,
    private readonly updateusedAtUseCase: UpdateExpiresAtUseCase,
  ) {}

  async execute({ token, password }: ResetPasswordRequestDto) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const resetToken = await this.findResetPasswordByTokenUseCase.execute(hashedToken);

    if (!resetToken) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    await this.resetUserPasswordUseCase.execute({
      password,
      user_id: resetToken.user_id,
    });

    await this.updateusedAtUseCase.execute({ token_id: resetToken.id });

    return {
      message: 'Senha atualizada com sucesso!',
    };
  }
}
