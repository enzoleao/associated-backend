import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';
import { UsersModule } from '@/modules';
import { ClientCodeRequestUseCase } from './use-cases/client-code/client-code.usecase';

@Global()
@Module({
  exports: [JwtModule],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, PrismaService, UserSigningUseCase, ClientCodeRequestUseCase],
})
export class AuthModule {}
