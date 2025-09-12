import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.cls.run(() => {
      this.cls.set('tenantId', 'cbacc0b6-03b3-4479-aaa1-bb8908964aaf');
      next();
    });
  }
}
