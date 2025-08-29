import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

interface MetaData {
  client_id: string;
  client_secret: string;
  phone_number_id: string;
  expires_in: number;
  api_url?: string;
  version?: string;
}

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS') private readonly redis: Redis,
  ) {}

  async getTokenPlataformWhatsappAuth(): Promise<{
    token: string;
    client_id: string;
    client_secret: string;
    phone_number_id: string;
  }> {
    const cached = await this.redis.get('meta_whatsapp_token');
    if (cached) return JSON.parse(cached);

    const record = await this.prisma.plataformAuthenticationData.findFirst({
      where: {
        provider: 'meta',
        provider_service: 'whatsapp-business',
      },
    });

    let tokenData: {
      token: string;
      client_id: string;
      client_secret: string;
      phone_number_id: string;
      expiresAt: Date;
      ttl: number;
    };

    if (!record || !record.meta_data) {
      tokenData = await this.renewTokenFromAPI();
      await this.saveToken(tokenData);
    } else {
      const metaData = record.meta_data as unknown as MetaData;
      const expiresIn = metaData.expires_in ?? 0;
      const expiresAt = new Date(Date.now() + expiresIn * 1000);

      if (expiresAt < new Date()) {
        tokenData = await this.renewTokenFromAPI();
        await this.saveToken(tokenData);
      } else {
        tokenData = {
          token: record.authorization_token,
          client_id: metaData.client_id,
          client_secret: metaData.client_secret,
          phone_number_id: metaData.phone_number_id,
          expiresAt,
          ttl: expiresIn,
        };
      }
    }

    const cacheData = {
      token: tokenData.token,
      client_id: tokenData.client_id,
      client_secret: tokenData.client_secret,
      phone_number_id: tokenData.phone_number_id,
    };

    await this.redis.set(
        'meta_whatsapp_token',
        JSON.stringify(cacheData),
        'EX',
        tokenData.ttl,
    );

    return cacheData;
  }

  private async saveToken(tokenData: {
    token: string;
    client_id: string;
    client_secret: string;
    phone_number_id: string;
    expiresAt: Date;
    ttl: number;
  }) {
    const existing = await this.prisma.plataformAuthenticationData.findFirst({
      where: { provider: 'meta', provider_service: 'whatsapp-business' },
    });

    if (existing) {
      // Atualiza
      await this.prisma.plataformAuthenticationData.update({
        where: { id: existing.id },
        data: {
          authorization_token: tokenData.token,
          meta_data: {
            client_id: tokenData.client_id,
            client_secret: tokenData.client_secret,
            phone_number_id: tokenData.phone_number_id,
            expires_in: tokenData.ttl,
          },
        },
      });
    } else {
      await this.prisma.plataformAuthenticationData.create({
        data: {
          id: uuidv4(),
          provider: 'meta',
          provider_service: 'whatsapp-business',
          authorization_token: tokenData.token,
          meta_data: {
            client_id: tokenData.client_id,
            client_secret: tokenData.client_secret,
            phone_number_id: tokenData.phone_number_id,
            expires_in: tokenData.ttl,
          },
        },
      });
    }
  }

  private async renewTokenFromAPI(): Promise<{
    token: string;
    client_id: string;
    client_secret: string;
    phone_number_id: string;
    expiresAt: Date;
    ttl: number;
  }> {
    throw new Error('Implementar renovação de token');
  }
}
