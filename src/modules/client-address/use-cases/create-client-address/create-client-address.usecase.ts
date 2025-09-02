import { Injectable } from "@nestjs/common";
import { CreateClientAddressRequestDto } from "../../dtos/create-client-address/create-client-address.dto";

@Injectable()
export class CreateClientAddressUseCase {
  constructor() {}

  async execute({ neighborhood, number, latitude, longitude, description }: CreateClientAddressRequestDto) {
    return { 

    };
  }
}
