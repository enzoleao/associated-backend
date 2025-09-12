import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Tenant } from '@prisma/client';
import { ITenantsRepository } from '@/modules/tenants/repositories/tenants.repository';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TenantsRepository implements ITenantsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cls: ClsService,
  ) {}

  async getTenantInformations(): Promise<Partial<Tenant> | null> {
    const tenantId = this.cls.get('tenantId');
    return this.prismaService.tenant.findUnique({
      select: {
        name: true,
      },
      where: {
        id: tenantId,
      },
    });
  }


}
