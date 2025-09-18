import { Injectable } from '@nestjs/common';

export interface ITenantInformationsRepository {
    getTenantInformationsByIdentification(identification: string): Promise<any>;
    
}
