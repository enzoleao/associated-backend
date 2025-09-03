import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Tenant, TenantAddress } from '@prisma/client';
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
        is_open: true,
      },
      where: {
        id: tenantId,
      },
    });
  }

  async getTenantAddress(): Promise<Partial<TenantAddress> | null > {
    const tenantId = this.cls.get('tenantId');
    const tenantAddress = await this.prismaService.tenant.findUnique({
      where: { id: tenantId },
      select: {
        address: {
          select: {
            id: true,
            street: true,
            neighborhood: true,
            number: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });

    return tenantAddress?.address ?? null
  }

}
