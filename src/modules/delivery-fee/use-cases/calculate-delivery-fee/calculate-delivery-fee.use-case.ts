import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { GetClientAddressUseCase } from '@/modules/client-address/use-cases';
import { MapBoxService } from '@/modules/mapbox/services/mapbox.service';
import { GetDeliveryFeeUseCase } from '@/modules/tenant-delivery-fee/use-cases';
import { GetTenantAddressUseCase } from '@/modules/tenants/use-cases';

@Injectable()
export class CalculateDeliveryFeeUseCase {
  constructor(
    private readonly getTenantAddressUseCase: GetTenantAddressUseCase,
    private readonly getClientAddressUseCase: GetClientAddressUseCase,
    private readonly mapBoxService: MapBoxService,
    private readonly getDeliveryFeeUseCase: GetDeliveryFeeUseCase,
    @Inject('REDIS') private readonly redis: Redis,
  ) {}

  async execute(addressId: string) {
    const cacheKey = `delivery:${addressId}`;
    
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const tenantAddress = await this.getTenantAddressUseCase.execute();
    const clientAddress = await this.getClientAddressUseCase.execute(addressId);

    if (!tenantAddress || !tenantAddress.latitude || !tenantAddress.longitude ||
        !clientAddress || !clientAddress.latitude || !clientAddress.longitude) {
      return null;
    }

    const origin: [number, number] = [
      parseFloat(tenantAddress.longitude),
      parseFloat(tenantAddress.latitude)
    ];

    const destination: [number, number] = [
      parseFloat(clientAddress.longitude),
      parseFloat(clientAddress.latitude)
    ];

    const distance = await this.mapBoxService.findDistancePoints({ origin, destination });

    const { price } = await this.getDeliveryFeeUseCase.execute(distance.distanceKm);

    const result = { distance: distance.distanceKm, price };

    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);

    return result;
  }
}
