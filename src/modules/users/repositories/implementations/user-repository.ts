import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from '@/modules/users/repositories/user.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserRolesEnum } from '@/common/enums/roles.enum';
import { ICreateUserAssociated } from '../../interfaces/create-user-associated/create-user-associated.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  getUserPermissions(userId: string): Promise<any> {
    return this.prismaService.tenantQuery('user', 'findUnique', {
      where: { id: userId },
      select: {
        role: {
          select: {
            permissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                    method: true,
                    resource: {
                      select: {
                        name: true,
                      },
                    },
                  },
                }
              },
            },
          },
        },
      },
    });
  }

 async createUserAssociated(data: ICreateUserAssociated): Promise<any> {
    const associatedRole = await this.prismaService.tenantQuery<{ id: string }>('role', 'findFirst', {
      where: {
        name: UserRolesEnum.ASSOCIATED
      },
      select: {
        id: true,
      },
    });
    if (associatedRole) {
        return this.prismaService.connectTenantQuery('user', 'create', {
          data: {
            ...data,
            birthday: new Date(data.birthday),
            role: {
              connect: {
                id: associatedRole.id,
              },
            },
          }
        })
    }

  }

  resetPassword({ password, user_id }: { password: string; user_id: string; }): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: user_id
      },
      data: {
        password
      }
    })
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.prismaService.connectTenantQuery('user', 'create', {
      data: {
        ...user,
        role: {
          connect: {
            name: UserRolesEnum.USER,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.tenantQuery('user', 'findFirst', {
      where: { email },
      include: {
        role: true,
      }
    });
  }

}
