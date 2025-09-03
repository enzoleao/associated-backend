import { Module } from '@nestjs/common';
import { ClientAddressController } from './controllers/client-address.controller';
import { CreateClientAddressUseCase, UpdateClientAddressUseCase, GetClientAddressesUseCase, GetClientAddressUseCase } from './use-cases';
import { ClientAddressRepository } from './repositories/implementation/client-address.repository';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports:[],
  controllers: [ClientAddressController],
  providers: [CreateClientAddressUseCase, UpdateClientAddressUseCase, GetClientAddressesUseCase, ClientAddressRepository, PrismaService, GetClientAddressUseCase],
  exports: [GetClientAddressUseCase]
})
export class ClientAddressModule {}