import { Module, NestModule } from '@nestjs/common';
import {
  AddonsModule,
  AuthModule,
  ClientAddressModule,
  ContextModule,
  MetaModule,
  OrderProductAddonsModule,
  OrderProductsModule,
  OrdersModule,
  PlataformModule,
  ProductsModule,
  QueueModule,
  RedisModule,
  StorageModule,
  TenantsModule,
  UsersModule,
} from '@/modules';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';



@Module({
  imports: [ProductsModule, UsersModule, ContextModule, AuthModule, StorageModule, TenantsModule, OrdersModule, AddonsModule, OrderProductsModule, OrderProductAddonsModule, RedisModule, MetaModule, PlataformModule, QueueModule, ClientAddressModule],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure() {}
}
