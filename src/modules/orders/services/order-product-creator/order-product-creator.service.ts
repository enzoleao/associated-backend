import { Injectable } from "@nestjs/common";
import { AddonDto, OptionDto, ProductDto } from "../../dtos/create-order/create-order-request.dto";
import { CreateOrderProductUseCase } from "@/modules/order-products/use-cases/create-order-product/create-order-product.usecase";
import { CreateOrderProductAddonUseCase } from "@/modules/order-product-addons/use-cases/create-order-product-addons/create-order-product-addons.usecase";
import { CreateOrderProductOptionUseCase } from "@/modules/order-product-options/use-cases/create-order-product-options/create-order-product-options.usecase";

@Injectable()
export class OrderProductCreatorService {
  constructor(
    private readonly createOrderProduct: CreateOrderProductUseCase,
    private readonly createOrderProductAddon: CreateOrderProductAddonUseCase,
    private readonly createOrderProductOption: CreateOrderProductOptionUseCase
  ) {}

  async createAll(products: ProductDto[], orderId: string) {
    for (const product of products) {
      await this.createFullProduct(product, orderId);
    }
  }

  private async createFullProduct(product: ProductDto, orderId: string) {
    const orderProduct = await this.createOrderProduct.execute({
      product_id: product.id,
      order_id: orderId,
      quantity: product.quantity,
    });

    if (product.addons) {
      await this.createAddons(orderProduct.id, product.addons);
    }

    if (product.options) {
      await this.createOptions(orderProduct.id, product.options);
    }
  }

  private async createAddons(orderProductId: string, addons: AddonDto[]) {
    for (const addon of addons) {
      await this.createOrderProductAddon.execute({
        order_has_product_id: orderProductId,
        quantity: addon.quantity,
        addon_id: addon.id,
      });
    }
  }

  private async createOptions(orderProductId: string, options: OptionDto[]) {
    for (const option of options) {
      await this.createOrderProductOption.execute({
        order_has_product_id: orderProductId,
        quantity: option.quantity,
        product_id: option.id,
      });
    }
  }
}
