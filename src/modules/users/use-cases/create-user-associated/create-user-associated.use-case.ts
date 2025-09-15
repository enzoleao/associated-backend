import { Injectable } from '@nestjs/common';
import { ICreateUserAssociated } from '../../interfaces/create-user-associated/create-user-associated.interface';

@Injectable()
export class CreateUserAssociatedUseCase {
  constructor(){}
  execute(createAssociatedData: ICreateUserAssociated) {
    return createAssociatedData
  }
}
