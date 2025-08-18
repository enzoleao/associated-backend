import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from '@/modules/users/repositories/user.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserRolesEnum } from '@/common/enums/roles.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
    return this.prismaService.tenantQuery('user', 'findUnique', {
      where: { email },
    });
  }
}
