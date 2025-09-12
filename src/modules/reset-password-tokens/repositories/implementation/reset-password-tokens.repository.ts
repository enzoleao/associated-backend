import { Injectable } from '@nestjs/common';
import { IResetPasswordTokensRepository } from '../reset-password-tokens.repository';
import { PasswordResetToken } from '@prisma/client';
import { ICreateResetPassword } from '../../interfaces/create-reset-password.interface';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ResetPasswordTokensRepository implements IResetPasswordTokensRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  updateExpiresAt(token_id: string): Promise<PasswordResetToken> {
    const dateNow = new Date();
    return this.prismaService.passwordResetToken.update({
      where: {
        id: token_id
      },
      data: {
        used_at: dateNow
      }
    })
  }
  async findResetPasswordByToken(token: string): Promise<PasswordResetToken | null> {
    const dateNow = new Date();

    return this.prismaService.passwordResetToken.findFirst({
      where: {
        token,
        expires_at: {
          gte: dateNow, 
        },
        used_at: null
      },
    });
  }

  async createPasswordResetToken({token, expires_at, user_id }: ICreateResetPassword): Promise<PasswordResetToken> {
    return this.prismaService.passwordResetToken.create({
      data: {
        token,
        expires_at, 
        user_id
      }
    })
  }
}
