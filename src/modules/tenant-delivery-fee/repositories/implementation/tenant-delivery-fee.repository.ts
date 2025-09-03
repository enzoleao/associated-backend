import { Injectable } from '@nestjs/common';
import { ITenantDeliveryFeeRepository } from '../tenant-delivery-fee.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TenantDeliveryFee } from '@prisma/client';

@Injectable()
export class TenantDeliveryFeeRepository implements ITenantDeliveryFeeRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getDeliveryFee(distance: number): Promise<Partial<TenantDeliveryFee>> {
    return this.prismaService.tenantQuery('tenantDeliveryFee', 'findFirst', {
      where: {
        max_distance: {
          gte: distance
        },
      },
      orderBy: {
          max_distance: 'asc'
      },
      select: {
        price: true
      }
    })
  }
}
