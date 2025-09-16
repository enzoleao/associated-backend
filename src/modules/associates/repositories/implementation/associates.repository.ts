import { Injectable } from '@nestjs/common';
import { IAssociatesRepository } from '../associates.repository';
import { Associate, User } from '@prisma/client';
import { ICreateAssociate } from '../../interfaces/create-associate.interface';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class AssociatesRepository implements IAssociatesRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  createAssociate({ user_id, membership_date, payment_method_preference_id, payment_due_date, associate_plan_id, associate_status_id  }: ICreateAssociate): Promise<Associate> {
    return this.prismaService.tenantAndAuditoryQuery('associate', 'create', {
      data: {
        user_id: user_id,
        membership_date: new Date(membership_date),
        payment_method_preference_id,
        payment_due_date,
        associate_plan_id,
        associate_status_id
      }
    })
  }
 
}
