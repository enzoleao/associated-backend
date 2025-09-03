import { Injectable } from "@nestjs/common";
import { CreateClientAddressRequestDto } from "../../dtos/create-client-address/create-client-address.dto";
import { ClientAddressRepository } from "../../repositories/implementation/client-address.repository";

@Injectable()
export class CreateClientAddressUseCase {
  constructor(
    private readonly clientAddressRepository: ClientAddressRepository 
  ) {}

  async execute({ neighborhood, number, latitude, longitude, description }: CreateClientAddressRequestDto) {
    return this.clientAddressRepository.createClientAddress({ neighborhood, number, latitude, longitude, description })
  }
}
