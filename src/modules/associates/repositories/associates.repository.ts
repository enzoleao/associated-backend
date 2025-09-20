import { Associate } from '@prisma/client';
import { ICreateAssociate } from '../interfaces/create-associate.interface';
import { GetAssociatesRequestParams } from '../dtos/get-associates/get-associates-request.dto';

export interface IAssociatesRepository {
    createAssociate(data: ICreateAssociate): Promise<Associate>

    getAssociates(query: GetAssociatesRequestParams): Promise<any>

    getAssociatesReport(): Promise<{totalUsers: number; activeUsers: number; totalDependents: number}>;

    getAssociateById(associatedId: string): Promise<any>
}
