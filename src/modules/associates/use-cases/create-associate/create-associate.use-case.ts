import { Injectable } from '@nestjs/common';
import { CreateAssociateRequestDto } from '../../dtos/create-associate/create-associate-request.dto';
import { CreateUserAssociatedUseCase } from '@/modules/users/use-cases';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';
import { CreateAssociateAddressUseCase } from '@/modules/associate-address/use-cases';

@Injectable()
export class CreateAssociateUseCase {
  constructor(
    private readonly createUserAssociatedUseCase: CreateUserAssociatedUseCase,
    private readonly associatesRepository: AssociatesRepository,
    private readonly createAssociateAddressUseCase: CreateAssociateAddressUseCase,

  ){}
  async execute({ 
    name, 
    email, 
    phone, 
    rg, 
    cpf, 
    city, 
    zip_code, 
    neighborhood,
    number,
    state_id,
    profession_name, 
    birthday, 
    image_path, 
    street,
    color, 
    payment_due_date, 
    payment_method_preference_id, 
    associate_plan_id, 
    associate_status_id, 
    membership_date
   }: CreateAssociateRequestDto) {
    const userCreated = await this.createUserAssociatedUseCase.execute({name, email, phone, rg, cpf, profession_name, image_path, birthday, color })
    const associatedData = await this.associatesRepository.createAssociate({user_id: userCreated.id, payment_due_date, payment_method_preference_id,membership_date, associate_plan_id, associate_status_id})
    await this.createAssociateAddressUseCase.execute({neighborhood, number, country_state_id: state_id, street, associate_id: associatedData.id, zip_code, city})

    
    return userCreated
  }
}
