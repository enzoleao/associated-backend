import { Controller } from '@nestjs/common';
import { GetUserMenusUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';

@Controller('menus')
export class MenusController {
  constructor(
    private readonly getUserMenusUseCase: GetUserMenusUseCase
  ){}

  
  @Endpoint({
    method: 'GET',
    summary: 'Get User Menus',
    isProtectedRoute: true,

  })
  async getMenus() {
    const menus = await this.getUserMenusUseCase.execute();
    return menus;
  }
}
