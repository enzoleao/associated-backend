import { Injectable } from '@nestjs/common';
import { CreateAssociateRequestDto } from '../../dtos/create-associate/create-associate-request.dto';
import { CreateUserAssociatedUseCase } from '@/modules/users/use-cases';

@Injectable()
export class CreateAssociateUseCase {
  constructor(
    private readonly createUserAssociatedUseCase: CreateUserAssociatedUseCase
  ){}
  async execute({ name, email, phone, rg, cpf, city, zip_code, profession_name, birthday, image_path }: CreateAssociateRequestDto) {
    const userCreated = await this.createUserAssociatedUseCase.execute({name, email, phone, rg, cpf, profession_name, image_path, birthday })
    return userCreated
  }
}
