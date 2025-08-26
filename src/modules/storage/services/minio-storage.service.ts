import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MinioStorageService {
  private readonly client: S3Client;

  constructor() {
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

  async getPresignedUploadUrl({
    key,
    contentType,
    expiresIn = 600,
  }: {
    key: string;
    contentType: string;
    expiresIn?: number;
  }): Promise<{ uploadUrl: string; publicUrl: string }> {
    const command = new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET ?? '',
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    const publicUrl = `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_BUCKET}/${key}`;

    return { uploadUrl, publicUrl };
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: process.env.MINIO_BUCKET ?? '',
      Key: key,
    });

    await this.client.send(command);
  }
}
