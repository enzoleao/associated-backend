import { Controller, Param } from '@nestjs/common';
import { GetDependentsUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';

@Controller('dependents')
export class DependentsController {
  constructor(
    private readonly getDependentsUseCase: GetDependentsUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Dependents By Associated ID',
    isProtectedRoute: true,
    route: 'associate/:id'

  })
  async getDependents(@Param('id') id: string) {
    const dependents = await this.getDependentsUseCase.execute(id);
    return dependents;
  }
}
