import { Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { GetTenantInformationsUsecase } from '@/modules/tenants/use-cases/get-tenant-informations/get-tenant-informations.usecase';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly getTenantInformations: GetTenantInformationsUsecase,
  ) {}

  @Endpoint({
    method: 'GET',
    route: '/informations',
    summary: 'Get Tenant Informations for Applications.',
  })
  async getProductsGrouped() {
    return this.getTenantInformations.execute();
  }
}
