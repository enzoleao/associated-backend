import { UserRolesEnum } from '../../../src/common/enums/roles.enum';
import { PermissionSeeder } from './permission.seeder';

export class ProductsCategoriesPermissionSeeder {
  private productsCategoriesPermissions = [
    {
      name: 'products-categories.read',
      resource: 'products-categories',
      method: 'GET',
    },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.productsCategoriesPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
