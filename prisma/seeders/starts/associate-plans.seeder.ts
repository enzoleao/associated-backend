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
          const existingPlan = await prisma.associatePlan.findFirst({
            where: {
              name: plan.name,
              tenant_id: tenant.id,
            },
          });

          if (!existingPlan) {
            await prisma.associatePlan.create({
              data: {
                name: plan.name,
                tenant_id: tenant.id,
              },
            });

            console.log(
              '\x1b[32m%s\x1b[0m',
              `Associate plan "${plan.name}" seeded successfully for tenant ${tenant.id}.`,
            );
          } else {
            console.log(
              '\x1b[33m%s\x1b[0m',
              `Associate plan "${plan.name}" already exists for tenant ${tenant.id}, skipping.`,
            );
          }
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
