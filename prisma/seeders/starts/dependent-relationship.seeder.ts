import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DependentRelationshipSeeder {
  async seed() {
    const dependentRelationshipdata = [
        { "name": "Cônjuge" },
        { "name": "Filho(a)" },
        { "name": "Enteado(a)" },
        { "name": "Irmão(ã)" },
        { "name": "Pai/Mãe" },
        { "name": "Sogro(a)" },
        { "name": "Neto(a)" },
        { "name": "Avô/Avó" },
        { "name": "Outro" }
    ]

    for (const dependentRelationships of dependentRelationshipdata) {
      try {
        await prisma.dependentRelationship.upsert({
          where: { name: dependentRelationships.name },
          update: {},
          create: { name: dependentRelationships.name },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Dependent relationship "${dependentRelationships.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding dependent relationship "${dependentRelationships.name}":`,
          error,
        );
      }
    }
  }
}
