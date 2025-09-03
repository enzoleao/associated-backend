import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../../repositories/implementation/tenants.repository';

@Injectable()
export class GetTenantAddressUseCase {
  constructor(private readonly tenantRepository: TenantsRepository){}
  execute() {
    return this.tenantRepository.getTenantAddress()
  }
}
