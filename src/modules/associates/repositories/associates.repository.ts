import { User } from '@prisma/client';

export interface IAssociatesRepository {
    createAssociate(): Promise<User>
}
