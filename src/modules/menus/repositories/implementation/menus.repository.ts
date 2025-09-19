import { Injectable } from '@nestjs/common';
import { IMenusRepository } from '../menus.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class MenusRepository implements IMenusRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cls: ClsService
  ){}
  async getUserMenus(): Promise<any> {
    const userId = await this.cls.get('userId');

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { role_id: true },
    });

    if (!user) return [];

    const menus = await this.prismaService.menu.findMany({
  where: {
    resource: {
      permissions: {
        some: { roles: { some: { role_id: user.role_id } } },
      },
    },
  },
  select: {
    id: true,
    name: true,
    path: true,
    icon: true,
    subMenus: {
      select: {
        id: true,
        name: true,
        icon: true,
        order: true,
      },
    },
    resource: {
      select: {
        permissions: {
          where: { roles: { some: { role_id: user.role_id } } },
          select: { name: true, method: true},
        },
      },
    },
  },
  orderBy: { order: 'asc' },
    });
    return menus;
  }
}
