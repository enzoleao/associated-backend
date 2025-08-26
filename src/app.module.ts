import { Module, NestModule } from '@nestjs/common';
import {
  AddonsModule,
  AuthModule,
  ContextModule,
  OrderProductAddonsModule,
  OrderProductsModule,
  OrdersModule,
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
    OrdersModule,
    AddonsModule,
    OrderProductsModule,
    OrderProductAddonsModule
  ],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure() {}
}
