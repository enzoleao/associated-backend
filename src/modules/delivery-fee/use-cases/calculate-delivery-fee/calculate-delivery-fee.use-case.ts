import { GetClientAddressUseCase } from '@/modules/client-address/use-cases';
import { MapBoxService } from '@/modules/mapbox/services/mapbox.service';
import { GetDeliveryFeeUseCase } from '@/modules/tenant-delivery-fee/use-cases';
import { GetTenantAddressUseCase } from '@/modules/tenants/use-cases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateDeliveryFeeUseCase {
  constructor(
    private readonly getTenantAddressUseCase: GetTenantAddressUseCase,
    private readonly getClientAddressUseCase: GetClientAddressUseCase,
    private readonly mapBoxService: MapBoxService,
    private readonly getDeliveryFeeUseCase: GetDeliveryFeeUseCase
  ){}

  async execute(addressId: string) {
    const tenantAddress = await this.getTenantAddressUseCase.execute();
    const clientAddress = await this.getClientAddressUseCase.execute(addressId);

    if (tenantAddress?.latitude && tenantAddress?.longitude && clientAddress?.latitude && clientAddress.longitude) {
      const origin: [number, number] = [
        parseFloat(tenantAddress.longitude),
        parseFloat(tenantAddress.latitude)
      ];

      const destination: [number, number] = [
        parseFloat(clientAddress.longitude),
        parseFloat(clientAddress.latitude)
      ];

      const distance = await this.mapBoxService.findDistancePoints({ origin, destination });
      const { price } = await this.getDeliveryFeeUseCase.execute(distance.distanceKm)
      return {
        distance: distance.distanceKm,
        price
      };
    }

    return null;
  }
}

