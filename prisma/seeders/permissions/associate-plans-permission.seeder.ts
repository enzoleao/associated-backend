import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class AssociatePlansPermissionSeeder {
  private associatePlansPermissions = [
    { name: 'associate-plans.read', resource_name: 'ASSOCIATE_PLANS', method: 'GET' },
    { name: 'associate-plans.create', resource_name: 'ASSOCIATE_PLANS', method: 'POST' },
    { name: 'associate-plans.update', resource_name: 'ASSOCIATE_PLANS', method: 'PUT' },
    { name: 'associate-plans.delete', resource_name: 'ASSOCIATE_PLANS', method: 'DELETE' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.associatePlansPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
