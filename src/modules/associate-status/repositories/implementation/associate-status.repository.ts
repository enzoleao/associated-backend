import { Injectable } from '@nestjs/common';
import { IAssociateStatusRepository } from '../associate-status.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AssociateStatus } from '@prisma/client';

@Injectable()
export class AssociateStatusRepository implements IAssociateStatusRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  getAssociateStatus(): Promise<AssociateStatus[]> {
    return this.prismaService.associateStatus.findMany()
  }
}
