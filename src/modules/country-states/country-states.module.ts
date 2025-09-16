import { Module } from '@nestjs/common';
import { CountryStatesController } from './controllers/country-states.controller';
import { CountryStatesRepository } from './repositories/implementation/country-states.repository';
import { GetCountryStatesUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CountryStatesController],
  providers: [CountryStatesRepository, GetCountryStatesUseCase, PrismaService],
})
export class CountryStatesModule {}
