import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';
import { UsersModule } from '@/modules';
import { ClientCodeRequestUseCase } from './use-cases/client-code/client-code.usecase';
import { ClientCodeAuthService } from './services/client-auth-code.service';
import { RedisModule } from '../redis/redis.module';
import { MetaModule } from '../meta/meta.module';
import { QueueModule } from '../queue/queue.module';
import { ClientSigninUseCase } from './use-cases/client-signin/client-signin.usecase';
import { ClientsModule } from '../clients/clients.module';

@Global()
@Module({
  imports: [
    RedisModule,
    QueueModule,
    MetaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ClientsModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, PrismaService, UserSigningUseCase, ClientCodeRequestUseCase, ClientCodeAuthService, ClientSigninUseCase],
  exports: [JwtModule],
})
export class AuthModule {}
