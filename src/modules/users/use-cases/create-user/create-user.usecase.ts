import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/users/repositories/implementations/user-repository';
import { CreateUserRequestDto } from '@/modules/users/dtos';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserRequestDto) {
    const userExists = await this.userRepository.findUserByEmail(input.email);
    if (userExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const userCreated = await this.userRepository.createUser({
      ...input,
      password: hashedPassword,
      initials: this.createUserInitials(input.name),
    });
    return {
      ...userCreated,
      password: undefined,
    };
  }

  private createUserInitials(userName: string): string {
    if (!userName) return 'NN';

    const parts = userName.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    const firstInitial = parts[0][0];
    const lastInitial = parts[parts.length - 1][0];

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }
}
