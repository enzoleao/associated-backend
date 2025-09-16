import { Module } from '@nestjs/common';
import { AssociatePlansController } from './controllers/associate-plans.controller';
import { AssociatePlansRepository } from './repositories/implementation/associate-plans.repository';
import { GetAssociatePlansUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssociatePlansController],
  providers: [AssociatePlansRepository, GetAssociatePlansUseCase, PrismaService],
})
export class AssociatePlansModule {}
