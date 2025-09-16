import { Injectable } from '@nestjs/common';
import { ICountryStatesRepository } from '../country-states.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CountryState } from '@prisma/client';

@Injectable()
export class CountryStatesRepository implements ICountryStatesRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getCountryStates(): Promise<CountryState[]> {
    return this.prismaService.countryState.findMany();
  }

  
}
