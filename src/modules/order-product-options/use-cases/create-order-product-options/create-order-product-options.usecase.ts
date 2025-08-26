import { Injectable } from '@nestjs/common';
import { OrderProductOptionsRepository } from '../../repositories/implementation/order.product-options.repository';
import { ICreateOrderProductOption } from '../../interfaces/create-order-product-option.interface';

@Injectable()
export class CreateOrderProductOptionUseCase {
  constructor(private readonly orderProductOptionsRepository: OrderProductOptionsRepository) {}

  async execute({
    order_has_product_id,
    product_id,
    quantity
  }: ICreateOrderProductOption) {
    return this.orderProductOptionsRepository.createProductOption({
        order_has_product_id,
        product_id,
        quantity
    });
  }
}
