import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '@/modules/tenants/repositories/implementation/tenants.repository';

@Injectable()
export class GetTenantInformationsUsecase {
  constructor(private readonly tenantRepository: TenantsRepository) {}

  async execute() {
    return this.tenantRepository.getTenantInformations();
  }
}
