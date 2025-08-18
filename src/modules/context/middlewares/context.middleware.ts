import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.cls.run(() => {
      const tenantId = req.headers['tenant_id'] as string;
      this.cls.set('tenantId', tenantId);
      next();
    });
  }
}
