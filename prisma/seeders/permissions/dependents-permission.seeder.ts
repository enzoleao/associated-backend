import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class DependentsPermissionSeeder {
  private dependentPermissions = [
    { name: 'dependents.read', resource_name: 'DEPENDENTS', method: 'GET' },
    { name: 'dependents.associate.read', resource_name: 'DEPENDENTS', method: 'GET' },
    { name: 'dependents.create', resource_name: 'DEPENDENTS', method: 'POST' },
    { name: 'dependents.update', resource_name: 'DEPENDENTS', method: 'PUT' },
    { name: 'dependents.delete', resource_name: 'DEPENDENTS', method: 'DELETE' },
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
