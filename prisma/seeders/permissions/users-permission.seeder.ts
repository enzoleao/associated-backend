import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class UsersPermissionSeeder {
  private productPermissions = [
    { name: 'users.read', resource: 'users', method: 'GET' },
    { name: 'users.create', resource: 'users', method: 'POST' },
    { name: 'users.update', resource: 'users', method: 'PUT' },
    { name: 'users.delete', resource: 'users', method: 'DELETE' },
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
