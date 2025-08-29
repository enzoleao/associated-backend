import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IClientsRepository } from '../clients.repository';
import { ICreateClient } from '../../interfaces/create-client.interface';

@Injectable()
export class ClientRepository implements IClientsRepository {
  constructor(private readonly prismaService: PrismaService) {}
    createClient({ phone_number, name }: ICreateClient): Promise<Client> {
        return this.prismaService.client.create({
            data: {
                phone_number,
                name
            }
        })
    }
    findClientByPhoneNumber(phone_number: string): Promise<Client | null> {
        return this.prismaService.client.findUnique({
            where: {
                phone_number
            }
        })
    }
}
