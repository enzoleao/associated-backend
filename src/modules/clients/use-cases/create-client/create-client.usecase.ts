import { Injectable } from "@nestjs/common";
import { ICreateClient } from "../../interfaces/create-client.interface";
import { ClientRepository } from "../../repositories/implementation/clients.repository";

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}
  
  async execute({ name, phone_number }: ICreateClient) {
    return this.clientRepository.createClient({ name, phone_number })
  }
}
