import { Injectable } from '@nestjs/common';
import { TenantInformationsRepository } from '../../repositories/implementation/tenant-informations.repository';

@Injectable()
export class GetTenantInformationsByIdentificationUseCase {
  constructor(
    private readonly tenantInformationsRepository: TenantInformationsRepository
  ){}
  async execute(identification: string): Promise<any> {
    const response = await this.tenantInformationsRepository.getTenantInformationsByIdentification(identification);
    return {
      id: response?.id,
      identification: response?.identification,
      name: response?.name,
      logo_image: response? process.env.MINIO_PUBLIC_ENDPOINT + response.logo_image : undefined,
    }
  }
}
