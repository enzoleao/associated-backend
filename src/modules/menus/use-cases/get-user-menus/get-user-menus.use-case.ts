import { Injectable } from '@nestjs/common';
import { MenusRepository } from '../../repositories/implementation/menus.repository';

@Injectable()
export class GetUserMenusUseCase {
  constructor(
    private readonly menusRepository: MenusRepository
  ){}
  execute() {
    return this.menusRepository.getUserMenus();
  }
}
