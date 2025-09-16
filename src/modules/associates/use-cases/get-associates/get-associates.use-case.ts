import { Injectable } from '@nestjs/common';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';
import { GetAssociatesRequestParams } from '../../dtos/get-associates/get-associates-request.dto';

@Injectable()
export class GetAssociatesUseCase {
  constructor(
    private readonly associatesRepository: AssociatesRepository
  ){}
  execute(query: GetAssociatesRequestParams) {
    return this.associatesRepository.getAssociates(query)
  }
}
