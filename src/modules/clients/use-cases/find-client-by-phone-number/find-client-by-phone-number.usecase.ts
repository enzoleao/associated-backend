import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../repositories/implementation/clients.repository";

@Injectable()
export class FindClientByPhoneNumberUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}
  
  async execute(phone_number: string) {
    return this.clientRepository.findClientByPhoneNumber(phone_number)
  }
}
