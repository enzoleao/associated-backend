import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { CustomBadRequestException } from '@/common/exceptions';
import { ErrorMessages } from '@/common/messages/error-messages';
import { GetUserPermissionsUseCase } from '@/modules/users/use-cases';

type JwtPayload = {
  userId: string;
  email: string;
  tenantId: string;
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly cls: ClsService,
    private readonly getUserPermissionsUseCase: GetUserPermissionsUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const { userId, tenantId } = payload;
    
    await this.setContext(payload);

    const permissionNameRequired = this.generatePermissionNameByUrl({  url: req.url, method: req.method});
    const userPermissions = await this.findUserRolePermissions(userId);

    const checkedPermission = await this.checkUserPermission({name: permissionNameRequired, method: req.method, permissions: userPermissions})
    if (!checkedPermission) {
      return false
    }
    if (!userId || !tenantId) {
      this.throwUnauthorizedError({error: ['token']});
    }


    return true;
  }

 private setContext({ userId, tenantId }: JwtPayload): void {
    if (userId) this.cls.set('userId', userId);
    if (tenantId) this.cls.set('tenantId', tenantId);
  }

  private throwUnauthorizedError({error}: {error: string[]}): never {
    throw new CustomBadRequestException(
      error,
      ErrorMessages.invalidToken,
      'UNAUTHORIZED',
    );
  }
  
  private generatePermissionNameByUrl({ url, method }: { url: string, method: string }): string {
    const methodMap: Record<string, string> = {
      GET: 'read',
      POST: 'create',
      PUT: 'update',
      PATCH: 'update',
      DELETE: 'delete'
    };

    const isId = (segment: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const numberRegex = /^\d+$/;
      return uuidRegex.test(segment) || numberRegex.test(segment);
    };

    const cleanPath = (url as any)?.split('?')[0] ?? url;
    const parts = cleanPath.split('/').filter(Boolean).filter(seg => !isId(seg));
    const resource = parts.join('.');

    const action = methodMap[method.toUpperCase()] || 'unknown';

    return `${resource}.${action}`;
  }


  private async findUserRolePermissions(userId: string) {
    const userPermission = await this.getUserPermissionsUseCase.execute(userId) 
    return userPermission
  }

  private async checkUserPermission({ name, method, permissions }): Promise<boolean> {
    const hasPermission = permissions.some(
      (p) => p.permission.name === name && p.permission.method === method
    );

    if (!hasPermission) {
      return false
    }

    return true;
  }
}
