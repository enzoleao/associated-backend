import { Module } from '@nestjs/common';
import { TenantInformationsController } from './controllers/tenant-informations.controller';
import { TenantInformationsRepository } from './repositories/implementation/tenant-informations.repository';
import { GetTenantInformationsByIdentificationUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TenantInformationsController],
  providers: [TenantInformationsRepository, GetTenantInformationsByIdentificationUseCase, PrismaService],
})
export class TenantInformationsModule {}
