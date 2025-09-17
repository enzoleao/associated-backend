import { Injectable } from '@nestjs/common';
import { IDependentsRepository } from '../dependents.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class DependentsRepository implements IDependentsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  getDependentsByAssociatedId(associatedId: string): Promise<any> {
    return this.prismaService.tenantQuery('associate', 'findMany', {
      where: {
        id: associatedId
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
        },
      },
      dependent: {
        select: {
          id: true,
          name: true,
          birthday: true,
          cpf: true
        }
      }
      }
    })
  }
}
