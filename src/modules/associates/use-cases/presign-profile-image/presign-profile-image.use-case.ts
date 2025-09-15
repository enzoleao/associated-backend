import { Injectable } from '@nestjs/common';
import { PresignProfileImageRequestDto } from '../../dtos/presign-profile-image/presign-profile-image-request.dto';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PresignProfileImageUseCase {
  constructor(
    private readonly minioStorageService: MinioStorageService,
    private readonly cls: ClsService,
  ){}
  async execute(data: PresignProfileImageRequestDto) {
    const tenantId = this.cls.get('tenantId')
    const key =  `/profiles/${tenantId}/${uuidv4()}`
    const presignData = await this.minioStorageService.getPresignedUploadUrl({
      contentType: data.content_type,
      key
    })

  return {
    ...presignData,
    key
  }
  }
}
