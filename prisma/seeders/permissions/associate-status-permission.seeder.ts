import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class AssociateStatusPermissionSeeder {
  private associatePermissions = [
    { name: 'associate-status.read', resource_name: 'ASSOCIATE_STATUS', method: 'GET' },
    { name: 'associate-status.create', resource_name: 'ASSOCIATE_STATUS', method: 'POST' },
    { name: 'associate-status.update', resource_name: 'ASSOCIATE_STATUS', method: 'PUT' },
    { name: 'associate-status.delete', resource_name: 'ASSOCIATE_STATUS', method: 'DELETE' },
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
