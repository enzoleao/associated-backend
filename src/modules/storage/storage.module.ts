import { Module } from '@nestjs/common';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';

@Module({
  controllers: [],
  providers: [MinioStorageService],
})
export class StorageModule {}
