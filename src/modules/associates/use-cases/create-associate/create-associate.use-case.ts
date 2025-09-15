import { Injectable } from '@nestjs/common';
import { CreateAssociateRequestDto } from '../../dtos/create-associate/create-associate-request.dto';

@Injectable()
export class CreateAssociateUseCase {
  constructor(){}
  execute({ name }: CreateAssociateRequestDto) {
    console.log(name)
  }
}
