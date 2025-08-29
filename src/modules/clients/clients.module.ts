import { Module } from '@nestjs/common';
import { CreateClientUseCase } from './use-cases/create-client/create-client.usecase';
import { PrismaService } from '../prisma/prisma.service';
import { ClientRepository } from './repositories/implementation/clients.repository';
import { FindClientByPhoneNumberUseCase } from './use-cases/find-client-by-phone-number/find-client-by-phone-number.usecase';

@Module({
  imports:[],
  controllers: [],
  providers: [CreateClientUseCase, PrismaService, ClientRepository, FindClientByPhoneNumberUseCase],
  exports: [CreateClientUseCase, FindClientByPhoneNumberUseCase]
})
export class ClientsModule {}
