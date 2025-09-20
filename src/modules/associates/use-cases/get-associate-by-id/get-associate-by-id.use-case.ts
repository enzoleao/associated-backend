import { Injectable } from '@nestjs/common';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';

@Injectable()
export class GetAssociateByIdUseCase {
  constructor(
    private readonly associateRepository: AssociatesRepository,
    private readonly minioStorageService: MinioStorageService
    
  ){}
  async execute(associateId: string) {
    const data = await this.associateRepository.getAssociateById(associateId)
    return {
      ...data,
      image_path: await this.minioStorageService.getPresignedDownloadUrl({key: data.image_path, expiresIn: 3600}) ?? null
    }
  }
}
