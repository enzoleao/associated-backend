import { ClientAddress } from "@prisma/client";
import { CreateClientAddressRequestDto } from "../dtos/create-client-address/create-client-address.dto";

export interface IClientAddressRepository {
  createClientAddress(order: CreateClientAddressRequestDto): Promise<ClientAddress>;
  getClientAddress(id: string): Promise<ClientAddress | null>
}
