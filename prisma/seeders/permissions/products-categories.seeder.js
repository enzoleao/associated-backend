"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsCategoriesPermissionSeeder = void 0;
const roles_enum_1 = require("../../../src/common/enums/roles.enum");
const permission_seeder_1 = require("./permission.seeder");
class ProductsCategoriesPermissionSeeder {
    productsCategoriesPermissions = [
        {
            name: 'products-categories.read',
            resource: 'products-categories',
            method: 'GET',
        },
    ];
    roles = [roles_enum_1.UserRolesEnum.ADMIN, roles_enum_1.UserRolesEnum.USER];
    async seed() {
        const permissionSeeder = new permission_seeder_1.PermissionSeeder(this.productsCategoriesPermissions, this.roles);
        await permissionSeeder.seed();
    }
}
exports.ProductsCategoriesPermissionSeeder = ProductsCategoriesPermissionSeeder;
//# sourceMappingURL=products-categories.seeder.js.map