import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IOrderProductsRepository } from '../order-products.repository';
import { ICreateOrderProducts } from '../../interfaces/create-order-products.interface';
import { OrderHasProducts } from '@prisma/client';

@Injectable()
export class OrderProductsRepository implements IOrderProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrderProduct({order_id, product_id, quantity}: ICreateOrderProducts): Promise<OrderHasProducts> {
    return this.prismaService.orderHasProducts.create({
        data: {
            product_id,
            order_id,
            quantity
        }
    })
      
  }
}
