import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class UsersPermissionSeeder {
  private productPermissions = [
    { name: 'users.read', resource_name: 'USERS', method: 'GET' },
    { name: 'users.create', resource_name: 'USERS', method: 'POST' },
    { name: 'users.update', resource_name: 'USERS', method: 'PUT' },
    { name: 'users.delete', resource_name: 'USERS', method: 'DELETE' },
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
