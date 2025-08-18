import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ContextMiddleware } from '@/modules/context/middlewares/context.middleware';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: false },
    }),
  ],
})
export class ContextModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
