import { Module } from '@nestjs/common';
import { ClientAddressController } from './controllers/client-address.controller';
import { CreateClientAddressUseCase, UpdateClientAddressUseCase, GetClientAddressesUseCase } from './use-cases';


@Module({
  imports:[],
  controllers: [ClientAddressController],
  providers: [CreateClientAddressUseCase, UpdateClientAddressUseCase, GetClientAddressesUseCase],
})
export class ClientAddressModule {}