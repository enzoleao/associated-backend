import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class MenusPermissionSeeder {
  private menuPermissions = [
    { name: 'menus.read', resource_name: 'MENUS', method: 'GET' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER, UserRolesEnum.ASSOCIATED];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.menuPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
