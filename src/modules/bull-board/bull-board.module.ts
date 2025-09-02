import { DynamicModule, Module } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as basicAuth from 'express-basic-auth';

@Module({})
export class BullBoardModule {
  static forRoot(app, queues: any[]): DynamicModule {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: queues.map((q) => new BullAdapter(q)),
      serverAdapter,
    });

    app.use(
      '/admin/queues',
      basicAuth({
        users: { admin: process.env.BULLBOARD_PASSWORD ?? 'root' },
        challenge: true,
      }),
      serverAdapter.getRouter(),
    );

    return {
      module: BullBoardModule,
    };
  }
}
