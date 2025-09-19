import { Module } from '@nestjs/common';
import { MenusController } from './controllers/menus.controller';
import { MenusRepository } from './repositories/implementation/menus.repository';
import { GetUserMenusUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MenusController],
  providers: [MenusRepository, GetUserMenusUseCase, PrismaService],
})
export class MenusModule {}
