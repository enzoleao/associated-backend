import {
  UsersPermissionSeeder,
} from './seeders/permissions';
import { RolesSeeder } from './seeders/starts';
import { RolesPermisionSeeder } from './seeders/permissions/roles-permission.seeder';

class Seeder {
  private readonly seeders: { seed: () => Promise<void> }[];

  constructor() {
    this.seeders = [
      new RolesSeeder(),
      new UsersPermissionSeeder(),
      new RolesPermisionSeeder(),
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
