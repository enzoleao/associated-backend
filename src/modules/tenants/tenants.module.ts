import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TenantsRepository } from '@/modules/tenants/repositories/implementation/tenants.repository';
import { TenantsController } from '@/modules/tenants/controllers/tenants.controller';
import { GetTenantInformationsUsecase } from './use-cases';

@Module({
  controllers: [TenantsController],
  providers: [GetTenantInformationsUsecase, PrismaService, TenantsRepository],
  exports: []
})
export class TenantsModule {}
