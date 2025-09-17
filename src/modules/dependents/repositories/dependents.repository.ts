import { Injectable } from '@nestjs/common';
import { Associate } from '@prisma/client';

export interface IDependentsRepository {
    getDependentsByAssociatedId(userId: string): Promise<any>;
}
