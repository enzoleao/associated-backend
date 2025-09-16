import { Injectable } from '@nestjs/common';
import { IAssociateAddressRepository } from '../associate-address.repository';
import { AssociateAddress } from '@prisma/client';
import { ICreateAssociateAddress } from '../../interfaces/create-associate-address.interface';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class AssociateAddressRepository implements IAssociateAddressRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  createAssociateAddress(data: ICreateAssociateAddress): Promise<AssociateAddress> {
    return this.prismaService.tenantAndAuditoryQuery('associateAddress', 'create', {
      data: {
        ...data,
      }
    })
  }
}
