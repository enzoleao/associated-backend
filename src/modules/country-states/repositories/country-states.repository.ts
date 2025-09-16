import { Injectable } from '@nestjs/common';
import { CountryState } from '@prisma/client';

export interface ICountryStatesRepository {
    getCountryStates(): Promise<CountryState[]>;
}
