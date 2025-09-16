import { Endpoint } from '@/common/decorators/endpoint';
import { Controller } from '@nestjs/common';
import { GetAssociatePlansUseCase } from '../use-cases';

@Controller('associate-plans')
export class AssociatePlansController {
  constructor(
    private readonly getAssociatePlansUseCase: GetAssociatePlansUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Associate Plans.',
    isProtectedRoute: true
  })
    getAssociateReport() {
    return this.getAssociatePlansUseCase.execute()
  }
  
}
