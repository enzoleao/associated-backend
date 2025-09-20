import { Module } from '@nestjs/common';
import { AssociatesController } from './controllers/associates.controller';
import { AssociatesRepository } from './repositories/implementation/associates.repository';
import { CreateAssociateUseCase, PresignProfileImageUseCase, GetAssociatesUseCase, GetAssociatesReportUseCase, GetAssociateByIdUseCase, GetPdfReportUseCase } from './use-cases';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';
import { AssociateAddressModule } from '../associate-address/associate-address.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [UsersModule, AssociateAddressModule, PdfModule],
  controllers: [AssociatesController],
  providers: [AssociatesRepository, CreateAssociateUseCase, PresignProfileImageUseCase, PrismaService, GetAssociatesUseCase, GetAssociatesReportUseCase, GetAssociateByIdUseCase, GetPdfReportUseCase],
})
export class AssociatesModule {}
