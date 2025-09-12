import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/implementations/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetUserPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}
  async execute({ user_id, password }: {user_id: string; password: string;}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.resetPassword({ user_id, password: hashedPassword })
  }
}
