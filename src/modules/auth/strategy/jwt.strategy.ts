import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { CustomBadRequestException } from '@/common/exceptions';
import { ErrorMessages } from '@/common/messages';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Permission } from '@prisma/client';

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (tenantId !== req.headers.tenant_id && client_token !== true) {
      return this.throwUnauthorizedError();
    }
    if (userId) {
      this.setUserIdContext(userId);
    }
    if (client) {
      this.setClientIdContext(client);
    }
    return true;
  }

  private setUserIdContext(userId: string): void {
    this.cls.set('userId', userId);
  }

  private setClientIdContext(clientId: string): void {
    this.cls.set('clientId', clientId);
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
