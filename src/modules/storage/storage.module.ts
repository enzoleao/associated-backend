import { Global, Module } from '@nestjs/common';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';
import { CacheModule } from '@nestjs/cache-manager';


@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 3600,
      isGlobal: true, 
    }),
  ],
  controllers: [],
  providers: [MinioStorageService],
  exports: [MinioStorageService]
})
export class StorageModule {}
