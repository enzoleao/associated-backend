import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ClientAddress } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { IClientAddressRepository } from '../client-address.repository';
import { CreateClientAddressRequestDto } from '../../dtos/create-client-address/create-client-address.dto';

@Injectable()
export class ClientAddressRepository implements IClientAddressRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cls: ClsService,

  ) {}

    async getClientAddresses (){
        const client_id = await this.cls.get('clientId')
        return this.prismaService.clientAddress.findMany({
            where: {
                client_id
            }
        })
    }

    async createClientAddress({latitude, longitude, neighborhood, number, description}: CreateClientAddressRequestDto): Promise<ClientAddress> {
        const client_id = await this.cls.get('clientId')
        return this.prismaService.clientAddress.create({
            data: {
                latitude,
                longitude,
                neighborhood,
                number,
                description,
                client_id
            }
        })
    }

}
