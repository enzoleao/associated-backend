import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IOrdersRepository } from '../orders.repository';
import { ICreateOrder } from '../../interfaces/create-order.interface';
import { Orders } from '@prisma/client';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder({total, sub_total, discount }: ICreateOrder): Promise<Orders>{
    return this.prismaService.tenantQuery('orders', 'create', {
        data: {
            total,
            sub_total,
            discount,
            delivery_fee: 10
        }
    })
   }
}
