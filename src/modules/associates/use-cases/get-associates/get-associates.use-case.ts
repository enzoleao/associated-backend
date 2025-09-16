import { Injectable } from '@nestjs/common';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';
import { GetAssociatesRequestParams } from '../../dtos/get-associates/get-associates-request.dto';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';

@Injectable()
export class GetAssociatesUseCase {
  constructor(
    private readonly associatesRepository: AssociatesRepository,
    private readonly minioStorageService: MinioStorageService
  ){}

  async execute(query: GetAssociatesRequestParams) {
    const responseData = await this.associatesRepository.getAssociates(query);

    const signedData = await Promise.all(
      responseData.data.map(async (item) => {
        const signedImage =  await this.minioStorageService.getPresignedDownloadUrl({key: item.image_path, expiresIn: 3600})
          ?? null;

        return {
          ...item,
          image_path: signedImage,
        };
      })
    );

    return {
      ...responseData,
      data: signedData,
    };
  }
}
