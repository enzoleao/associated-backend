import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductsCategoriesSeeder {
  async seed() {
    const productCategoriesData = [
      { name: 'Lanches', icon: 'Sandwich' },
      { name: 'Sobremesas', icon: 'Popsicle' },
      { name: 'Bebidas', icon: 'CupSoda' },
      { name: 'Pratos Principais', icon: 'CupSoda' },
      { name: 'Entradas', icon: 'UtensilsCrossed' },
    ];
    for (const productsCategories of productCategoriesData) {
      try {
        const productCategory = await prisma.productCategory.upsert({
          where: { name: productsCategories.name },
          update: {},
          create: {
            name: productsCategories.name,
          },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Role "${productCategory.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding product category "${productsCategories.name}":`,
          error,
        );
      }
    }
  }
}
