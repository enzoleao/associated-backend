import { Module, NestModule } from '@nestjs/common';
import {
  AuthModule,
  ContextModule,
  QueueModule,
  RedisModule,
  StorageModule,
  TenantsModule,
  UsersModule,
  ResetPasswordTokensModule,
  EmailsModule,
  ResetPasswordModule,
  AssociatesModule
} from '@/modules';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { BullConfigModule } from './modules/bull/bull.module';



@Module({
  imports: [UsersModule, ContextModule, AuthModule, StorageModule, TenantsModule, RedisModule, QueueModule, BullConfigModule, ResetPasswordTokensModule, EmailsModule, ResetPasswordModule, AssociatesModule],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure() {}
}
