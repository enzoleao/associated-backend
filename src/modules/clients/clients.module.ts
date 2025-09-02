import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientRepository } from './repositories/implementation/clients.repository';
import { CreateClientUseCase, FindClientByPhoneNumberUseCase } from './use-cases';

@Module({
  imports:[],
  controllers: [],
  providers: [CreateClientUseCase, PrismaService, ClientRepository, FindClientByPhoneNumberUseCase],
  exports: [CreateClientUseCase, FindClientByPhoneNumberUseCase]
})
export class ClientsModule {}
