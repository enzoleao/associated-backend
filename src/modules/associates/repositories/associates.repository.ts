import { Associate } from '@prisma/client';
import { ICreateAssociate } from '../interfaces/create-associate.interface';

export interface IAssociatesRepository {
    createAssociate(data: ICreateAssociate): Promise<Associate>
}
