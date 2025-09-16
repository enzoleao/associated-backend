import { Module } from '@nestjs/common';
import { AssociateStatusController } from './controllers/associate-status.controller';
import { AssociateStatusRepository } from './repositories/implementation/associate-status.repository';
import { GetAssociateStatusUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssociateStatusController],
  providers: [AssociateStatusRepository, GetAssociateStatusUseCase, PrismaService],
})
export class AssociateStatusModule {}
