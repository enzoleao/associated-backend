import { Injectable } from "@nestjs/common";
import { CreateOrderRequestDto } from "../../dtos";
import { currencyFixed } from "@/common/helpers/index";

@Injectable()
export class OrderSummaryCalculatorService {
  calculateSummary(
    products: CreateOrderRequestDto['products'],
    productMap: Map<string, { id: string; price: number; promotion?: any }>,
    addonMap: Map<string, { id: string; price: number }>
  ) {
    let subtotal = 0;
    let discountTotal = 0;

    for (const item of products) {
      const product = productMap.get(item.id);
      if (!product) continue;

      const quantity = item.quantity;
      const productPrice = product.price;
      const itemTotal = productPrice * quantity;

      subtotal += itemTotal;

      if (product.promotion?.is_active) {
        const discount = this.calculateDiscount(productPrice, product.promotion);
        discountTotal += discount * quantity;
      }

      for (const opt of item.options ?? []) {
        const optProduct = productMap.get(opt.id);
        if (optProduct) {
          subtotal += optProduct.price * opt.quantity;
        }
      }

      for (const addon of item.addons ?? []) {
        const addonItem = addonMap.get(addon.id);
        if (addonItem) {
          subtotal += addonItem.price * addon.quantity;
        }
      }
    }

    const total = subtotal - discountTotal;

    return {
      subtotal: currencyFixed(subtotal),
      discount_total: currencyFixed(discountTotal),
      total: currencyFixed(total)
    };
  }

  private calculateDiscount(price: number, promotion: { discount_type: string; value: any }): number {
    const rawValue = promotion.value;
    const value = typeof rawValue === 'number'
      ? rawValue
      : typeof rawValue?.toNumber === 'function'
        ? rawValue.toNumber()
        : parseFloat(rawValue?.toString?.() || '0');

    if (!value) return 0;

    return promotion.discount_type === 'PERCENTAGE'
      ? price * value
      : promotion.discount_type === 'FIXED'
        ? value
        : 0;
  }

  extractIds(products: CreateOrderRequestDto['products']) {
    const productIds = new Set<string>();
    const addonIds = new Set<string>();

    for (const { id, options, addons } of products) {
      productIds.add(id);
      options?.forEach(opt => productIds.add(opt.id));
      addons?.forEach(addon => addonIds.add(addon.id));
    }

    return { productIds, addonIds };
  }
}
