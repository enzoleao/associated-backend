import { Module } from '@nestjs/common';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user/create-user.usecase';
import { UserRepository } from '@/modules/users/repositories/implementations/user-repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { FindUserByEmailUseCase, ResetUserPasswordUseCase, CreateUserAssociatedUseCase } from './use-cases';
import { ResetPasswordTokensModule } from '../reset-password-tokens/reset-password-tokens.module';

@Module({
  imports: [ResetPasswordTokensModule],
  controllers: [UsersController],
  providers: [UserRepository, CreateUserUseCase, PrismaService, FindUserByEmailUseCase, ResetUserPasswordUseCase, CreateUserAssociatedUseCase],
  exports: [UserRepository, FindUserByEmailUseCase, ResetUserPasswordUseCase],
})
export class UsersModule {}
