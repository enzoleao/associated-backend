import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ResourceSeeder {
  async seed() {
    const resourceData = [
      { "name": "USERS" },
      { "name": "ASSOCIATES" },
      { "name": "DEPENDENTS" },
      { "name": "ROLES" },
      { "name": "MENUS" },
      { "name": "PAYMENT_METHODS" },
      { "name": "PAYMENTS" },
      { "name": "DASHBOARD" },
      { "name": "SETTINGS" },
      { "name": "COUNTRY_STATES"},
      { "name": "ASSOCIATE_PLANS" },
      { "name": "ASSOCIATE_STATUS" },
      { "name": "HOME" },
    ]

    for (const resource of resourceData) {
      try {
        await prisma.resource.upsert({
          where: { name: resource.name },
          update: {},
          create: { name: resource.name },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Resource "${resource.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding resource "${resource.name}":`,
          error,
        );
      }
    }
  }
}
