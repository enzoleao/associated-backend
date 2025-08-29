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
import { RedisModule } from './modules/redis/redis.module';
import { MetaModule } from './modules/meta/meta.module';
import { PlataformModule } from './modules/plataform/plataform.module';
import { QueueModule } from './modules/queue/queue.module';

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
    OrderProductAddonsModule,
    RedisModule,
    MetaModule,
    PlataformModule,
    QueueModule
  ],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure() {}
}
