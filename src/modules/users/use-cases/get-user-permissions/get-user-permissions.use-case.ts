import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/implementations/user-repository';

@Injectable()
export class GetUserPermissionsUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ){}
  async execute(userId: string) {
    const data = await this.userRepository.getUserPermissions(userId);
    return data.role.permissions
  }
}
