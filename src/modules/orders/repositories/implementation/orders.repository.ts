import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IOrdersRepository } from '../orders.repository';
import { ICreateOrder } from '../../interfaces/create-order.interface';
import { Orders } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cls: ClsService,

  ) {}

  async createOrder({total, sub_total, discount }: ICreateOrder): Promise<Orders>{

    const clientId = await this.cls.get('clientId')
    return this.prismaService.tenantQuery('orders', 'create', {
        data: {
            total,
            sub_total,
            discount,
            client_id: clientId,
            delivery_fee: 10
        }
    })
   }
}
