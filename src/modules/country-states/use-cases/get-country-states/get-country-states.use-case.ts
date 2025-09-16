import { Injectable } from '@nestjs/common';
import { CountryStatesRepository } from '../../repositories/implementation/country-states.repository';

@Injectable()
export class GetCountryStatesUseCase {
  constructor(
    private readonly countryStatesRepository: CountryStatesRepository
  ){}
  execute() {
    return this.countryStatesRepository.getCountryStates()
  }
}
