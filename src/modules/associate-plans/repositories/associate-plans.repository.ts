import { Injectable } from '@nestjs/common';
import { AssociatePlan } from '@prisma/client';

export interface IAssociatePlansRepository {
    getAssociatePlans(): Promise<AssociatePlan[]>;
}
