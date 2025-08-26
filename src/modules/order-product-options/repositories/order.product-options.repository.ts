import { OrderProductOptions } from "@prisma/client";
import { ICreateOrderProductOption } from "../interfaces/create-order-product-option.interface";

export interface IOrderProductOptionsRepository {
  createProductOption(productOption: ICreateOrderProductOption): Promise<OrderProductOptions>;
}
