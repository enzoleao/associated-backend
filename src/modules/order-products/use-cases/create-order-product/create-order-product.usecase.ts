import { Injectable } from '@nestjs/common';
import { ICreateOrderProducts } from '../../interfaces/create-order-products.interface';
import { OrderProductsRepository } from '../../repositories/implementation/order-products.repository';

@Injectable()
export class CreateOrderProductUseCase {
    constructor(private readonly orderProductRepository: OrderProductsRepository){}
    async execute({
        product_id,
        order_id,
        quantity
    }: ICreateOrderProducts) {
        return this.orderProductRepository.createOrderProduct({product_id, order_id, quantity})
    }
}
