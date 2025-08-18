import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { GetTenantInformationsUsecase } from '@/modules/tenants/use-cases/get-tenant-informations/get-tenant-informations.usecase';
import { TenantsRepository } from '@/modules/tenants/repositories/implementation/tenants.repository';
import { TenantsController } from '@/modules/tenants/controllers/tenants.controller';

@Module({
  controllers: [TenantsController],
  providers: [GetTenantInformationsUsecase, PrismaService, TenantsRepository],
})
export class TenantsModule {}
