import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class HomePermissionSeeder {
  private dependentPermissions = [
    { name: 'home.read', resource_name: 'HOME', method: 'GET' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.dependentPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
