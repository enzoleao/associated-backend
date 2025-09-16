import { Module } from '@nestjs/common';
import { AssociatesController } from './controllers/associates.controller';
import { AssociatesRepository } from './repositories/implementation/associates.repository';
import { CreateAssociateUseCase, PresignProfileImageUseCase, GetAssociatesUseCase, GetAssociatesReportUseCase } from './use-cases';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';
import { AssociateAddressModule } from '../associate-address/associate-address.module';

@Module({
  imports: [UsersModule, AssociateAddressModule],
  controllers: [AssociatesController],
  providers: [AssociatesRepository, CreateAssociateUseCase, PresignProfileImageUseCase, PrismaService, GetAssociatesUseCase, GetAssociatesReportUseCase],
})
export class AssociatesModule {}
