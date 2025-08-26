import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { OrderProductAddons } from '@prisma/client';
import { IOrderProductAddonsRepository } from '../order-product-addons.repository';
import { ICreateProductAddon } from '../../interfaces/create-product-addon.interface';

@Injectable()
export class OrderProductAddonsRepository implements IOrderProductAddonsRepository {
  constructor(private readonly prismaService: PrismaService) {}

    async createProductAddon({ order_has_product_id, addon_id, quantity }: ICreateProductAddon): Promise<OrderProductAddons> {
        return this.prismaService.orderProductAddons.create({
            data: {
                order_has_product_id,
                addon_id,
                quantity
            }
        })
    }
}
