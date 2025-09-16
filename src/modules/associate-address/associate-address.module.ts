import { Module } from '@nestjs/common';
import { AssociateAddressController } from './controllers/associate-address.controller';
import { AssociateAddressRepository } from './repositories/implementation/associate-address.repository';
import { CreateAssociateAddressUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssociateAddressController],
  providers: [AssociateAddressRepository, CreateAssociateAddressUseCase, PrismaService],
  exports: [CreateAssociateAddressUseCase]
})
export class AssociateAddressModule {}
