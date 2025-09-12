import { Module } from '@nestjs/common';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { ResetPasswordRepository } from './repositories/implementation/reset-password.repository';
import { ForgetPasswordRequestUseCase, ResetUserPasswordUseCase } from './use-cases';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordRepository, ForgetPasswordRequestUseCase, ResetUserPasswordUseCase],
  exports: [ForgetPasswordRequestUseCase, ResetUserPasswordUseCase]
})
export class ResetPasswordModule {}
