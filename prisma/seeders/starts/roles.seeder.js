"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesSeeder = void 0;
const client_1 = require("@prisma/client");
const roles_enum_1 = require("../../../src/common/enums/roles.enum");
const prisma = new client_1.PrismaClient();
class RolesSeeder {
    async seed() {
        const roles = Object.values(roles_enum_1.UserRolesEnum);
        for (const roleName of roles) {
            try {
                const role = await prisma.role.upsert({
                    where: { name: roleName },
                    update: {},
                    create: { name: roleName },
                });
                console.log('\x1b[32m%s\x1b[0m', `Role "${role.name}" seeded successfully.`);
            }
            catch (error) {
                console.error('\x1b[31m%s\x1b[0m', `Error seeding role "${roleName}":`, error);
            }
        }
    }
}
exports.RolesSeeder = RolesSeeder;
//# sourceMappingURL=roles.seeder.js.map