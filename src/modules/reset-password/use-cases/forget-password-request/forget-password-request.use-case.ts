import { Injectable } from '@nestjs/common';
import { CreatePasswordResetTokenUseCase } from '@/modules/reset-password-tokens/use-cases';
import * as crypto from 'crypto';
import { FindUserByEmailUseCase } from '@/modules/users/use-cases';
import { RegisterNotificationService } from '@/modules/queue/services/register-notification.service';

@Injectable()
export class ForgetPasswordRequestUseCase {
  constructor(
    private readonly createPasswordResetTokenUseCase: CreatePasswordResetTokenUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly registerNotificationService: RegisterNotificationService
  ) {}

  async execute({ email }: { email: string }) {
    const user = await this.findUserByEmailUseCase.execute(email);

    if (!user) {
      // não vazar info se o email existe ou não
      return;
    }

    // token em texto puro (vai por e-mail)
    const token = crypto.randomBytes(32).toString('hex');

    // hash determinístico com sha256 (vai para o banco)
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // salva no banco
    await this.createPasswordResetTokenUseCase.execute({
      user_id: user.id,
      token: hashedToken,
      expires_at: new Date(Date.now() + 1000 * 60 * 15), // 15 minutos
    });

    // envia o token puro
    this.registerNotificationService.sendResetPasswordQueue({
      email,
      token,
      user_name: user.name.split(' ')[0],
    });

    return;
  }
}
