import { Module } from '@nestjs/common';
import { DependentsController } from './controllers/dependents.controller';
import { DependentsRepository } from './repositories/implementation/dependents.repository';
import { GetDependentsUseCase } from './use-cases';

@Module({
  controllers: [DependentsController],
  providers: [DependentsRepository, GetDependentsUseCase],
})
export class DependentsModule {}
