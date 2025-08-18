import { Module } from '@nestjs/common';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user/create-user.usecase';
import { UserRepository } from '@/modules/users/repositories/implementations/user-repository';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, CreateUserUseCase, PrismaService],
  exports: [UserRepository],
})
export class UsersModule {}
