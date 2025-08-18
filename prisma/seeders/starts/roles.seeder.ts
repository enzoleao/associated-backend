import { PrismaClient } from '@prisma/client';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

const prisma = new PrismaClient();

export class RolesSeeder {
  async seed() {
    const roles = Object.values(UserRolesEnum);

    for (const roleName of roles) {
      try {
        const role = await prisma.role.upsert({
          where: { name: roleName },
          update: {},
          create: { name: roleName },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Role "${role.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding role "${roleName}":`,
          error,
        );
      }
    }
  }
}
