import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';
import { UsersModule } from '@/modules';
import { RedisModule } from '../redis/redis.module';
import { QueueModule } from '../queue/queue.module';
import { ResetPasswordModule } from '../reset-password/reset-password.module';
import {  RegisterResetPasswordUseCase, ResetPasswordUseCase } from './use-cases';


@Global()
@Module({
  imports: [
    RedisModule,
    QueueModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ResetPasswordModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, PrismaService, UserSigningUseCase, RegisterResetPasswordUseCase, ResetPasswordUseCase],
  exports: [JwtModule],
})
export class AuthModule {}
