import { Injectable } from '@nestjs/common';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';
import { differenceInDays } from 'date-fns';
import { PdfService } from '@/modules/pdf/services/pdf.service';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';

@Injectable()
export class GetPdfReportUseCase {
  constructor(
    private readonly associateRepository: AssociatesRepository,
    private readonly pdfService: PdfService,
    private readonly minioStorageService: MinioStorageService
  ) {}

  async execute(associateId: string): Promise<Buffer> {
    const associateData = await this.associateRepository.getAssociateById(associateId);
    if (!associateData) {
      throw new Error('Associado não encontrado');
    }

    const address = associateData.associate.AssociateAddress?.[0] || {};

    const userData = {
      name: associateData.name || '',
      email: associateData.email || '',
      cpf: this.formatCPF(associateData.cpf),
      phone: this.formatPhone(associateData.phone),
      birthDate: this.formatDate(associateData.birthday),
      joinDate: this.formatDate(associateData.associate.membership_date),
      category: associateData.associate.associatePlan?.name || 'N/A',
      status: associateData.associate.associateStatus?.name || 'N/A',
      dependents: associateData.associate._count?.dependent || 0,
      lastPayment: '-', // Se você tiver essa info, coloque aqui
      address: {
        street: address.street || '',
        number: address.number || '',
        neighborhood: address.neighborhood || '',
        city: address.city || '',
        state: address.country_state?.initials || '',
        zip: address.zip_code || '',
      },
      daysAsMember: differenceInDays(new Date(), new Date(associateData.associate.membership_date))
    };

    return this.pdfService.generateUserReport(userData);
  }

  private formatCPF(cpf?: string): string {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private formatPhone(phone?: string): string {
    if (!phone) return '';
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  private formatDate(date?: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pt-BR');
  }
}

