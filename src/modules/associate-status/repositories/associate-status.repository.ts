import { AssociateStatus } from '@prisma/client';

export interface IAssociateStatusRepository {
    getAssociateStatus(): Promise<AssociateStatus[]>;
}
