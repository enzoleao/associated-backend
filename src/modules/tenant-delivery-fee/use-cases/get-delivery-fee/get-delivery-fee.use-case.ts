import { Injectable } from '@nestjs/common';
import { TenantDeliveryFeeRepository } from '../../repositories/implementation/tenant-delivery-fee.repository';

@Injectable()
export class GetDeliveryFeeUseCase {
  constructor(
    private readonly tenantDeliveryFeeRepository: TenantDeliveryFeeRepository
  ){}
  execute(distance: number) {
    return this.tenantDeliveryFeeRepository.getDeliveryFee(distance);
  }
}
