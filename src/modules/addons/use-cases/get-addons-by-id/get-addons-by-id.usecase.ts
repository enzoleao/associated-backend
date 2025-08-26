import { Injectable } from '@nestjs/common';
import { AddonsRepository } from '../../repositories/implementation/addons.repository';

@Injectable()
export class GetAddonsByIdUseCase {
  constructor(private readonly addonsRepository: AddonsRepository) {}

  async execute(id: string[]) {
    return this.addonsRepository.getAddonsById(id);
  }
}
