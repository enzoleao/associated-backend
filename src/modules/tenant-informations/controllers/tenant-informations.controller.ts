import { Controller, Param } from '@nestjs/common';
import { GetTenantInformationsByIdentificationUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';

@Controller('tenant-informations')
export class TenantInformationsController {
  constructor(
    private readonly getTenantInformationsByIdentificationUseCase: GetTenantInformationsByIdentificationUseCase
  ){}

  @Endpoint({
    method: 'GET',
    route: ':identification',
    summary: 'Get Tenant Informations by Identification.',
  })

  getTenantInformationsByIdentification(@Param('identification') identification: string) {
    return this.getTenantInformationsByIdentificationUseCase.execute(identification)
  }
}
