import { ConflictException, Injectable } from '@nestjs/common';
import { ICreateUserAssociated } from '../../interfaces/create-user-associated/create-user-associated.interface';
import { UserRepository } from '../../repositories/implementations/user-repository';
import { randomBytes } from 'crypto';
import { sanitizeString } from '@/common/utils';

@Injectable()
export class CreateUserAssociatedUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}
  async execute({ name, email, cpf, rg, image_path, phone, birthday, profession_name, color }: ICreateUserAssociated) {

    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      throw new ConflictException('Email já cadastrado');
    }

    return this.userRepository.createUserAssociated({
      name,
      email,
      phone: sanitizeString(phone),
      cpf: sanitizeString(cpf),
      birthday,
      image_path,
      rg,
      initials: this.createUserInitials(name),
      profession_name,
      password: this.generateRandomPassword(30),
      color
    });
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

  private  generateRandomPassword(length = 12): string {
  return randomBytes(length).toString('base64').slice(0, length);
}
}
