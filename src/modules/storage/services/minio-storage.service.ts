import { Inject, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Redis from 'ioredis';

@Injectable()
export class MinioStorageService {
  private readonly client: S3Client;

  constructor(@Inject('REDIS') private readonly redisClient: Redis) {
    this.client = new S3Client({
      endpoint: process.env.MINIO_PUBLIC_ENDPOINT,
      forcePathStyle: true,
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY ?? '',
        secretAccessKey: process.env.MINIO_SECRET_KEY ?? '',
      },
    });
  }

  // Upload presigned URL
  async getPresignedUploadUrl({
    key,
    contentType,
    expiresIn = 600,
  }: {
    key: string;
    contentType: string;
    expiresIn?: number;
  }): Promise<{ upload_url: string; public_url: string }> {
    const command = new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET ?? '',
      Key: key,
      ContentType: contentType,
    });

    const upload_url = await getSignedUrl(this.client, command, { expiresIn });

    const public_url = `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_BUCKET}${key}`;

    return { upload_url, public_url };
  }

  async getPresignedDownloadUrl({
    key,
    expiresIn = 3600,
  }: {
    key: string;
    expiresIn?: number;
  }): Promise<string> {
    if (!key) return '';

    const normalizedKey = key.startsWith('/') ? key.slice(1) : key;
    const cacheKey = `minio:signed:${normalizedKey}`;

    const cachedUrl = await this.redisClient.get(cacheKey);
    if (cachedUrl) {
      return cachedUrl;
    }

    const command = new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET ?? '',
      Key: normalizedKey,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn });

    await this.redisClient.set(cacheKey, url, 'EX', expiresIn - 60);

    return url;
  }
}
