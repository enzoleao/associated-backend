import { UserRolesEnum } from '../../../src/common/enums/roles.enum';
import { PermissionSeeder } from './permission.seeder';

export class ProductsPermissionSeeder {
  private productPermissions = [
    { name: 'products.read', resource: 'products', method: 'GET' },
    { name: 'products.create', resource: 'products', method: 'POST' },
    { name: 'products.update', resource: 'products', method: 'PUT' },
    { name: 'products.delete', resource: 'products', method: 'DELETE' },
  ];

  private roles = [UserRolesEnum.ADMIN];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.productPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
