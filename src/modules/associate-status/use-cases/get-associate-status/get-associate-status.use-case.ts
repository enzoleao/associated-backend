import { Injectable } from '@nestjs/common';
import { AssociateStatusRepository } from '../../repositories/implementation/associate-status.repository';

@Injectable()
export class GetAssociateStatusUseCase {
  constructor(
    private readonly associateStatusRepository: AssociateStatusRepository
  ){}
  execute() {
    return this.associateStatusRepository.getAssociateStatus()
  }
}
