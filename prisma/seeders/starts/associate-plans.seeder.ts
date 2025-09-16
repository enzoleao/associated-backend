import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AssociatePlansSeeder {
  async seed() {
    const associatePlans = [
      { name: "Padrão" },
    ];

    const tenants = await prisma.tenant.findMany({
      select: { id: true },
    });

    for (const tenant of tenants) {
      for (const plan of associatePlans) {
        try {
          await prisma.associatePlan.upsert({
            where: {
              tenant: {
                id: tenant.id,
              },
              name: plan.name
            },
            update: {
              name: plan.name,
            },
            create: {
              tenant_id: tenant.id,
              name: plan.name,
            },
          });

          console.log(
            '\x1b[32m%s\x1b[0m',
            `Associate plan "${plan.name}" seeded successfully for tenant ${tenant.id}.`,
          );
        } catch (error) {
          console.error(
            '\x1b[31m%s\x1b[0m',
            `Error seeding associate plan "${plan.name}" for tenant ${tenant.id}:`,
            error,
          );
        }
      }
    }
  }
}
