import { Injectable } from '@nestjs/common';
import { ICreateAssociateAddress } from '../../interfaces/create-associate-address.interface';
import { AssociateAddressRepository } from '../../repositories/implementation/associate-address.repository';

@Injectable()
export class CreateAssociateAddressUseCase {
  constructor(
    private readonly associateAddressRepository: AssociateAddressRepository
  ){}
  execute(data: ICreateAssociateAddress) {
    return this.associateAddressRepository.createAssociateAddress(data)
  }
}
