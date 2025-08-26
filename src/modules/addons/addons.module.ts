import { Module } from '@nestjs/common';
import { AddonsRepository } from './repositories/implementation/addons.repository';
import { PrismaService } from '../prisma/prisma.service';
import { GetAddonsByIdUseCase } from './use-cases/get-addons-by-id/get-addons-by-id.usecase';


@Module({
  controllers: [],
  providers: [
    AddonsRepository,
    PrismaService,
    GetAddonsByIdUseCase
  ],
  exports: [GetAddonsByIdUseCase]
})
export class AddonsModule {}
