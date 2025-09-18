import { Injectable } from '@nestjs/common';
import { ITenantInformationsRepository } from '../tenant-informations.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class TenantInformationsRepository implements ITenantInformationsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getTenantInformationsByIdentification(identification: string): Promise<any> {
    return this.prismaService.tenant.findUnique({
      where: {
        identification
      },
      select: {
        id: true,
        identification: true,
        name: true,
        logo_image: true,
      }
    })
  }
}
