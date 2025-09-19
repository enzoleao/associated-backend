import {
  AssociatePlansPermissionSeeder,
  AssociatesPermissionSeeder,
  AssociateStatusPermissionSeeder,
  CountryStatesPermissionSeeder,
  DependentsPermissionSeeder,
  PaymentMethodsPermissionSeeder,
  RolesPermisionSeeder,
  UsersPermissionSeeder,
} from './seeders/permissions';
import { 
  AssociatePlansSeeder, 
  AssociateStatusSeeder, 
  CountryStatessSeeder, 
  PaymentsMethodsSeeder, 
  DependentRelationshipSeeder,
  RolesSeeder, 
  ResourceSeeder} from './seeders/starts';

class Seeder {
  private readonly seeders: { seed: () => Promise<void> }[];

  constructor() {
    this.seeders = [
      new RolesSeeder(),
      new PaymentsMethodsSeeder(),
      new CountryStatessSeeder(),
      new AssociatePlansSeeder(),
      new AssociateStatusSeeder(),
      new DependentRelationshipSeeder(),
      new ResourceSeeder(),
      new AssociatePlansSeeder(),

      //PERMISSION
      new RolesPermisionSeeder(),
      new UsersPermissionSeeder(),
      new AssociatesPermissionSeeder(),
      new DependentsPermissionSeeder(),
      new PaymentMethodsPermissionSeeder(),
      new AssociateStatusPermissionSeeder(),
      new AssociatePlansPermissionSeeder(),
      new CountryStatesPermissionSeeder(),
    ];
  }

  async run() {
    try {
      console.log('Starting seeding process...');
      for (const seeder of this.seeders) {
        await seeder.seed();
      }
      console.log('\x1b[32m%s\x1b[0m', 'Seeding completed!');
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', 'Seeding failed:', error);
      process.exit(1);
    }
  }
}

const seeder = new Seeder();

void seeder.run();
