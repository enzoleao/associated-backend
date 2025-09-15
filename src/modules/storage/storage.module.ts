import { Global, Module } from '@nestjs/common';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';


@Global()
@Module({
  controllers: [],
  providers: [MinioStorageService],
  exports: [MinioStorageService]
})
export class StorageModule {}
