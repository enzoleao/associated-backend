import { Injectable } from '@nestjs/common';
import { ClientAddressRepository } from '../../repositories/implementation/client-address.repository';

@Injectable()
export class GetClientAddressUseCase {
  constructor(
    private readonly clientAddressRepository: ClientAddressRepository
  ){}
  execute(addressId: string) {
    return this.clientAddressRepository.getClientAddress(addressId)
  }
}
