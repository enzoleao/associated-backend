import { PrismaClient } from '@prisma/client';
import { UserRolesEnum } from '../../../src/common/enums/roles.enum';

const prisma = new PrismaClient();

export class RolesSeeder {
  async seed() {
    const roles = Object.values(UserRolesEnum);

    const tenants = await prisma.tenant.findMany({
      select: { id: true },
    });

    for (const tenant of tenants) {
      for (const roleName of roles) {
        try {
          const existingRole = await prisma.role.findFirst({
            where: {
              name: roleName,
              tenant_id: tenant.id,
            },
          });

          if (!existingRole) {
            await prisma.role.create({
              data: {
                name: roleName,
                tenant_id: tenant.id,
              },
            });

            console.log(
              '\x1b[32m%s\x1b[0m',
              `Role "${roleName}" seeded successfully for tenant ${tenant.id}.`,
            );
          } else {
            console.log(
              '\x1b[33m%s\x1b[0m',
              `Role "${roleName}" already exists for tenant ${tenant.id}, skipping.`,
            );
          }
        } catch (error) {
          console.error(
            '\x1b[31m%s\x1b[0m',
            `Error seeding role "${roleName}" for tenant ${tenant.id}:`,
            error,
          );
        }
      }
    }
  }
}
