import { Endpoint } from '@/common/decorators/endpoint';
import { Controller } from '@nestjs/common';
import { GetCountryStatesUseCase } from '../use-cases';

@Controller('country-states')
export class CountryStatesController {
  constructor(
    private readonly getCountryStatesUseCase: GetCountryStatesUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Country States.',
    isProtectedRoute: true
  })
    getCountryStates() {
    return this.getCountryStatesUseCase.execute()
  }
}
