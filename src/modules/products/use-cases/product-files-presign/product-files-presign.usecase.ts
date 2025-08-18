import { Injectable } from '@nestjs/common';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';
import { IProductFilesSignIn } from '@/modules/products/interfaces/product-files-presign.usecase';
import { randomUUID } from 'crypto';
import { ClsService } from 'nestjs-cls';
import { extension } from 'mime-types';

@Injectable()
export class ProductFilesPresignUsecase {
  constructor(
    private readonly minioStorageService: MinioStorageService,
    private readonly cls: ClsService,
  ) {}

  async execute({ contentType }: IProductFilesSignIn) {
    const tenantId = this.cls.get<string>('tenantId');
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(contentType)) {
      throw new Error('Tipo de arquivo não permitido.');
    }

    const ext = extension(contentType) || 'bin';

    const key = `public/tenants/${tenantId}/${randomUUID()}.${ext}`;

    const { uploadUrl, publicUrl } =
      await this.minioStorageService.getPresignedUploadUrl({
        contentType: contentType,
        key: key,
      });

    return { uploadUrl: uploadUrl, fileUrl: publicUrl, key };
  }
}
