import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { OrderProductOptions } from '@prisma/client';
import { IOrderProductOptionsRepository } from '../order.product-options.repository';
import { ICreateOrderProductOption } from '../../interfaces/create-order-product-option.interface';

@Injectable()
export class OrderProductOptionsRepository implements IOrderProductOptionsRepository {
  constructor(private readonly prismaService: PrismaService) {}
    async createProductOption({ order_has_product_id, product_id, quantity }: ICreateOrderProductOption): Promise<OrderProductOptions> {
        return this.prismaService.orderProductOptions.create({
            data: {
                order_has_product_id,
                product_id,
                quantity
            }
        })
    }

  
}
