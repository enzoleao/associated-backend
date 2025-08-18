import { Module, NestModule } from '@nestjs/common';
import {
  AuthModule,
  ContextModule,
  ProductsModule,
  StorageModule,
  TenantsModule,
  UsersModule,
} from '@/modules';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    ContextModule,
    AuthModule,
    StorageModule,
    TenantsModule,
  ],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure() {}
}
