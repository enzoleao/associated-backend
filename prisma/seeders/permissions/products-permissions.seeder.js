"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsPermissionSeeder = void 0;
const roles_enum_1 = require("../../../src/common/enums/roles.enum");
const permission_seeder_1 = require("./permission.seeder");
class ProductsPermissionSeeder {
    productPermissions = [
        { name: 'products.read', resource: 'products', method: 'GET' },
        { name: 'products.create', resource: 'products', method: 'POST' },
        { name: 'products.update', resource: 'products', method: 'PUT' },
        { name: 'products.delete', resource: 'products', method: 'DELETE' },
    ];
    roles = [roles_enum_1.UserRolesEnum.ADMIN];
    async seed() {
        const permissionSeeder = new permission_seeder_1.PermissionSeeder(this.productPermissions, this.roles);
        await permissionSeeder.seed();
    }
}
exports.ProductsPermissionSeeder = ProductsPermissionSeeder;
//# sourceMappingURL=products-permissions.seeder.js.map