"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPermissionSeeder = void 0;
const permission_seeder_1 = require("./permission.seeder");
const roles_enum_1 = require("../../../src/common/enums/roles.enum");
class UsersPermissionSeeder {
    productPermissions = [
        { name: 'users.read', resource: 'users', method: 'GET' },
        { name: 'users.create', resource: 'users', method: 'POST' },
        { name: 'users.update', resource: 'users', method: 'PUT' },
        { name: 'users.delete', resource: 'users', method: 'DELETE' },
    ];
    roles = [roles_enum_1.UserRolesEnum.ADMIN];
    async seed() {
        const permissionSeeder = new permission_seeder_1.PermissionSeeder(this.productPermissions, this.roles);
        await permissionSeeder.seed();
    }
}
exports.UsersPermissionSeeder = UsersPermissionSeeder;
//# sourceMappingURL=users-permission.seeder.js.map