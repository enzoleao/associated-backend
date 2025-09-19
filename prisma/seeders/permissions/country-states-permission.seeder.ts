import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class CountryStatesPermissionSeeder {
  private countryStatesPermissions = [
    { name: 'country-states.read', resource_name: 'COUNTRY_STATES', method: 'GET' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.countryStatesPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
