import { OrderHasProducts } from "@prisma/client";
import { ICreateOrderProducts } from "../interfaces/create-order-products.interface";

export interface IOrderProductsRepository {
  createOrderProduct(orderProduct: ICreateOrderProducts): Promise<OrderHasProducts>;
}
