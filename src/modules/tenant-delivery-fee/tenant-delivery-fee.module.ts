import { Module } from '@nestjs/common';
import { TenantDeliveryFeeController } from './controllers/tenant-delivery-fee.controller';
import { TenantDeliveryFeeRepository } from './repositories/implementation/tenant-delivery-fee.repository';
import { PrismaService } from '../prisma/prisma.service';
import { GetDeliveryFeeUseCase } from './use-cases';

@Module({
  controllers: [TenantDeliveryFeeController],
  providers: [TenantDeliveryFeeRepository, PrismaService, GetDeliveryFeeUseCase],
  exports: [GetDeliveryFeeUseCase]
})
export class TenantDeliveryFeeModule {}
