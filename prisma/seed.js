"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_1 = require("./seeders/permissions");
const starts_1 = require("./seeders/starts");
const roles_permission_seeder_1 = require("./seeders/permissions/roles-permission.seeder");
class Seeder {
    seeders;
    constructor() {
        this.seeders = [
            new starts_1.RolesSeeder(),
            new permissions_1.ProductsPermissionSeeder(),
            new permissions_1.UsersPermissionSeeder(),
            new starts_1.ProductsCategoriesSeeder(),
            new permissions_1.ProductsCategoriesPermissionSeeder(),
            new roles_permission_seeder_1.RolesPermisionSeeder(),
        ];
    }
    async run() {
        try {
            console.log('Starting seeding process...');
            for (const seeder of this.seeders) {
                await seeder.seed();
            }
            console.log('\x1b[32m%s\x1b[0m', 'Seeding completed!');
        }
        catch (error) {
            console.error('\x1b[31m%s\x1b[0m', 'Seeding failed:', error);
            process.exit(1);
        }
    }
}
const seeder = new Seeder();
void seeder.run();
//# sourceMappingURL=seed.js.map