import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class AssociatesPermissionSeeder {
  private associatePermissions = [
    { name: 'associates.read', resource_name: 'ASSOCIATES', method: 'GET' },
    { name: 'associates.associate-report.read', resource_name: 'ASSOCIATES', method: 'GET' },
    { name: 'associates.create', resource_name: 'ASSOCIATES', method: 'POST' },
    { name: 'associates.update', resource_name: 'ASSOCIATES', method: 'PUT' },
    { name: 'associates.delete', resource_name: 'ASSOCIATES', method: 'DELETE' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.associatePermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
