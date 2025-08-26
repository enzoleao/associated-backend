import { Injectable } from '@nestjs/common';
import { OrderProductAddonsRepository } from '../../repositories/implementation/order-product-addons.repository';
import { ICreateProductAddon } from '../../interfaces/create-product-addon.interface';

@Injectable()
export class CreateOrderProductAddonUseCase {
  constructor(private readonly orderProductAddonRepository: OrderProductAddonsRepository) {}

  async execute({
    order_has_product_id,
    addon_id,
    quantity,
  }: ICreateProductAddon) {
    return this.orderProductAddonRepository.createProductAddon({
        order_has_product_id,
        addon_id,
        quantity,
    });
  }
}
