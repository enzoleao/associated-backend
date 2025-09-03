import { Injectable } from '@nestjs/common';
import { ClientAddressRepository } from '../../repositories/implementation/client-address.repository';

@Injectable()
export class GetClientAddressesUseCase {
  constructor(
    private readonly clientAddressRepository: ClientAddressRepository
  ){}
  execute() {
    return this.clientAddressRepository.getClientAddresses()
  }
}
