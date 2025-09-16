import { Controller } from '@nestjs/common';
import { GetAssociateStatusUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';

@Controller('associate-status')
export class AssociateStatusController {
  constructor(
    private readonly getAssociateStatusUseCase: GetAssociateStatusUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Associate Status.',
    isProtectedRoute: true
  })
  getAssociateStatus() {
    return this.getAssociateStatusUseCase.execute()
  }
}
