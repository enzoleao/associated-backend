import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class RolesPermisionSeeder {
  private rolesPermissions = [
    { name: 'roles.read', resource: 'roles', method: 'GET' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.rolesPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
