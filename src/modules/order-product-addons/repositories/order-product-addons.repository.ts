import { OrderProductAddons } from "@prisma/client";
import { ICreateProductAddon } from "../interfaces/create-product-addon.interface";

export interface IOrderProductAddonsRepository {
  createProductAddon(productAddon: ICreateProductAddon): Promise<OrderProductAddons>;
}
