import { Injectable } from '@nestjs/common';
import { DependentsRepository } from '../../repositories/implementation/dependents.repository';

@Injectable()
export class GetDependentsUseCase {
  constructor(
    private readonly dependentsRepository: DependentsRepository
  ){}
  execute(id: string): Promise<any> {
    return this.dependentsRepository.getDependentsByAssociatedId(id);
  }
}
