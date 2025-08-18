"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesPermisionSeeder = void 0;
const permission_seeder_1 = require("./permission.seeder");
const roles_enum_1 = require("../../../src/common/enums/roles.enum");
class RolesPermisionSeeder {
    rolesPermissions = [
        { name: 'roles.read', resource: 'roles', method: 'GET' },
    ];
    roles = [roles_enum_1.UserRolesEnum.ADMIN, roles_enum_1.UserRolesEnum.USER];
    async seed() {
        const permissionSeeder = new permission_seeder_1.PermissionSeeder(this.rolesPermissions, this.roles);
        await permissionSeeder.seed();
    }
}
exports.RolesPermisionSeeder = RolesPermisionSeeder;
//# sourceMappingURL=roles-permission.seeder.js.map