import { PermissionSeeder } from './permission.seeder';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

export class PaymentMethodsPermissionSeeder {
  private paymentMethodPermissions = [
    { name: 'payment-methods.read', resource_name: 'PAYMENT_METHODS', method: 'GET' },
    { name: 'payment-methods.create', resource_name: 'PAYMENT_METHODS', method: 'POST' },
    { name: 'payment-methods.update', resource_name: 'PAYMENT_METHODS', method: 'PUT' },
    { name: 'payment-methods.delete', resource_name: 'PAYMENT_METHODS', method: 'DELETE' },
  ];

  private roles = [UserRolesEnum.ADMIN, UserRolesEnum.USER];

  async seed() {
    const permissionSeeder = new PermissionSeeder(
      this.paymentMethodPermissions,
      this.roles,
    );
    await permissionSeeder.seed();
  }
}
