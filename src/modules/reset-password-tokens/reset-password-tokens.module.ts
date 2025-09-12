import { Global, Module } from '@nestjs/common';
import { ResetPasswordTokensController } from './controllers/reset-password-tokens.controller';
import { ResetPasswordTokensRepository } from './repositories/implementation/reset-password-tokens.repository';
import { CreatePasswordResetTokenUseCase, FindResetPasswordByTokenUseCase, UpdateExpiresAtUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  controllers: [ResetPasswordTokensController],
  providers: [ResetPasswordTokensRepository, CreatePasswordResetTokenUseCase, PrismaService, FindResetPasswordByTokenUseCase, UpdateExpiresAtUseCase],
  exports: [CreatePasswordResetTokenUseCase, FindResetPasswordByTokenUseCase, UpdateExpiresAtUseCase]
})
export class ResetPasswordTokensModule {}
