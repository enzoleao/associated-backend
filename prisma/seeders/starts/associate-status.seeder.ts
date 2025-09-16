import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AssociateStatusSeeder {
  async seed() {
    const associateStatusData = [
      { "name": "Ativo", "color": "green" },
      { "name": "Inativo", "color": "red" },
      { "name": "Pendente", "color": "yellow" },
    ]

    for (const associateStatus of associateStatusData) {
      try {
        await prisma.associateStatus.upsert({
          where: { name: associateStatus.name },
          update: {},
          create: { name: associateStatus.name, color: associateStatus.color },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Associate status "${associateStatus.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding associate status "${associateStatus.name}":`,
          error,
        );
      }
    }
  }
}
