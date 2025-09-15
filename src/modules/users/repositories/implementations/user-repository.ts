import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from '@/modules/users/repositories/user.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserRolesEnum } from '@/common/enums/roles.enum';
import { ICreateUserAssociated } from '../../interfaces/create-user-associated/create-user-associated.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUserAssociated(data: ICreateUserAssociated): Promise<User> {
    return this.prismaService.connectTenantQuery('user', 'create', {
      data: {
        ...data,
        birthday: new Date(data.birthday),
        role: {
          connect: {
            name: UserRolesEnum.ASSOCIATED,
          },
        },
      }
    })
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
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }

}
