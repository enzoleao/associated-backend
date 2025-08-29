import { Client } from '@prisma/client';
import { ICreateClient } from '../interfaces/create-client.interface';

export interface IClientsRepository {
  findClientByPhoneNumber(phone_number: string): Promise<Client | null>
  createClient(client: ICreateClient): Promise <Client>
}
