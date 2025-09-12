import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/implementations/user-repository';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}
  execute(email: string) {
    return this.userRepository.findUserByEmail(email)
  }
}
