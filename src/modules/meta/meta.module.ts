import { Module } from '@nestjs/common';
import { WhatsappService } from './services/whatsapp-business/whatsapp-business.service';
import { TokenService } from './services/token-service/token-service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [],
  providers: [
    WhatsappService,
    TokenService,
    PrismaService
  ],
  exports: [WhatsappService]
})
export class MetaModule {}
