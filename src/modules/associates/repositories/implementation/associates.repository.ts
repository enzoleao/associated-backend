import { Injectable } from '@nestjs/common';
import { IAssociatesRepository } from '../associates.repository';
import { Associate, User } from '@prisma/client';
import { ICreateAssociate } from '../../interfaces/create-associate.interface';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { GetAssociatesRequestParams } from '../../dtos/get-associates/get-associates-request.dto';
import { paginate } from '@/common/helpers/paginate';

@Injectable()
export class AssociatesRepository implements IAssociatesRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}


  async getAssociates(paginationQueryDto: GetAssociatesRequestParams): Promise<any> {
    return paginate({
      prisma: this.prismaService,
      model: 'user',
      args: {
      ...paginationQueryDto,
      filters: {
        associate: {
          associateStatus: {
            id: paginationQueryDto.associate_status_id
          }
        }
      }
    },
      searchFields: ['name', 'cpf', 'email'],
      select: {
        id: true,
        name: true,
        email: true,
        image_path: true,
        cpf: true,
        associate: {
          select: {
            membership_date: true,
            associateStatus: {
              select: {
                id: true,
                name: true,
                color: true
              }
            },
            associatePlan: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        created_at: true,
      },
    });
  }


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
