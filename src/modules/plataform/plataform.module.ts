import { Module } from '@nestjs/common';
import { FindAuthDataUseCase } from './use-cases/find-auth-datas/find-auth-datas.usecase';
import { PlataformRepository } from './repositories/implementation/plataform.repositories';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports:[],
  providers: [FindAuthDataUseCase, PlataformRepository, PrismaService],
})
export class PlataformModule {}
