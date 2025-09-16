import { Injectable } from '@nestjs/common';
import { AssociatePlansRepository } from '../../repositories/implementation/associate-plans.repository';

@Injectable()
export class GetAssociatePlansUseCase {
  constructor(
    private readonly associatePlansRepository: AssociatePlansRepository
  ){}
  execute() {
    return this.associatePlansRepository.getAssociatePlans()
  }
}
