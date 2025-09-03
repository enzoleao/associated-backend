import { Module } from '@nestjs/common';
import { DeliveryFeeController } from './controllers/delivery-fee.controller';
import { DeliveryFeeRepository } from './repositories/implementation/delivery-fee.repository';
import { CalculateDeliveryFeeUseCase } from './use-cases';
import { TenantsModule } from '../tenants/tenants.module';
import { ClientAddressModule } from '../client-address/client-address.module';
import { MapboxModule } from '../mapbox/mapbox.module';
import { TenantDeliveryFeeModule } from '../tenant-delivery-fee/tenant-delivery-fee.module';

@Module({
  imports: [TenantsModule, ClientAddressModule, MapboxModule, TenantDeliveryFeeModule],
  controllers: [DeliveryFeeController],
  providers: [DeliveryFeeRepository, CalculateDeliveryFeeUseCase],
})
export class DeliveryFeeModule {}
