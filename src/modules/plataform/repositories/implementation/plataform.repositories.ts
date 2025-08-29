import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IPlataformRepository } from '../plataform.repositories';
import { IFindAuthData } from '../../interfaces/find-auth-data.interface';

@Injectable()
export class PlataformRepository implements IPlataformRepository {
  constructor(private readonly prismaService: PrismaService) {}

    findAuthData({ provider, provider_service }: IFindAuthData) {
        return this.prismaService.plataformAuthenticationData.findFirst({
            where: {
                provider,
                provider_service
            }
        })
    }

}
