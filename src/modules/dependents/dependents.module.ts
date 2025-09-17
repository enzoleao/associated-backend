import { Module } from '@nestjs/common';
import { DependentsController } from './controllers/dependents.controller';
import { DependentsRepository } from './repositories/implementation/dependents.repository';
import { GetDependentsUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DependentsController],
  providers: [DependentsRepository, GetDependentsUseCase, PrismaService],
})
export class DependentsModule {}
