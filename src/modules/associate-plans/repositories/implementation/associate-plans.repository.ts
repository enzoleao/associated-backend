import { Injectable } from '@nestjs/common';
import { IAssociatePlansRepository } from '../associate-plans.repository';
import { AssociatePlan } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class AssociatePlansRepository implements IAssociatePlansRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  getAssociatePlans(): Promise<AssociatePlan[]> {
    return this.prismaService.tenantQuery('associatePlan', 'findMany')
  }
}
