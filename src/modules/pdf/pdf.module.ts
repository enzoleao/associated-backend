import { Module } from '@nestjs/common';
import { PdfService } from './services/pdf.service';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [TenantsModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
