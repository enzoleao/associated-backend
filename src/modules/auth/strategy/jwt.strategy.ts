import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { CustomBadRequestException } from '@/common/exceptions';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Permission } from '@prisma/client';
import { ErrorMessages } from '@/common/messages/error-messages';

type JwtPayload = {
  userId: string;
  email: string;
  tenantId: string;
  client_token?: string;
  client?: string
};

type RoleWithPermissions = {
  role: {
    permissions: {
      permission: Permission;
    }[];
  } | null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly cls: ClsService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const { userId, tenantId, client_token, client } = payload;
    
    if (userId) {
      this.setUserIdContext(userId);
    }
    if (client) {
      this.setClientIdContext(client);
    }
    if (tenantId) {
      this.setTenantIdContext(tenantId)
    } 

    return true;
  }

  private setUserIdContext(userId: string): void {
    this.cls.set('userId', userId);
  }

  private setClientIdContext(clientId: string): void {
    this.cls.set('clientId', clientId);
  }  
  private setTenantIdContext(tenantId: string): void {
    this.cls.set('tenantId', tenantId);
  }

  private throwUnauthorizedError(): never {
    throw new CustomBadRequestException(
      ['token'],
      ErrorMessages.invalidToken,
      'UNAUTHORIZED',
    );
  }

  private async findUserRolePermissions(userId: string): Promise<Permission[]> {
    const user: RoleWithPermissions = await this.prismaService.tenantQuery(
      'user',
      'findUnique',
      {
        where: { id: userId },
        select: {
          role: {
            select: {
              permissions: {
                select: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    );

    return user?.role?.permissions?.map((rp) => rp.permission) ?? [];
  }
}
