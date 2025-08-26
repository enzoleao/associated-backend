import { Injectable } from "@nestjs/common";
import { CreateOrderRequestDto } from "../../dtos";
import { GetAddonsByIdUseCase } from "@/modules/addons/use-cases/get-addons-by-id/get-addons-by-id.usecase";
import { GetProductsByIdUseCase } from "@/modules/products/use-cases/get-products-by-id/get-products-by-id.usecase";
import { OrdersRepository } from "../../repositories/implementation/orders.repository";
import { OrderSummaryCalculatorService } from "../../services/order-summary-calculator/order-summary-calculator.service";
import { OrderProductCreatorService } from "../../services/order-product-creator/order-product-creator.service";

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly getProductsById: GetProductsByIdUseCase,
    private readonly getAddonsById: GetAddonsByIdUseCase,
    private readonly orderRepository: OrdersRepository,
    private readonly summaryCalculator: OrderSummaryCalculatorService,
    private readonly orderProductFactory: OrderProductCreatorService
  ) {}

  async execute({ products }: CreateOrderRequestDto) {
    const { productIds, addonIds } = this.summaryCalculator.extractIds(products);

    const [productsResponse, addonsResponse] = await Promise.all([
      this.getProductsById.execute(Array.from(productIds)),
      this.getAddonsById.execute(Array.from(addonIds)),
    ]);

    const productMap = new Map(productsResponse.map(p => [p.id, p]));
    const addonMap = new Map(addonsResponse.map(a => [a.id, a]));

    const { subtotal, discount_total, total } = this.summaryCalculator.calculateSummary(
      products, productMap, addonMap
    );

    const { id } = await this.orderRepository.createOrder({
      sub_total: subtotal,
      total: total,
      discount: discount_total,
    });

    await this.orderProductFactory.createAll(products, id);

    return { 
        id: id,
        resume: {
            subtotal, discount_total, total 
        }
    };
  }
}
