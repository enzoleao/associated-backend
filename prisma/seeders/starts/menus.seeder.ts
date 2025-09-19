import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export class MenusSeeder {
  async seed() {
    const menusData = [
      { name: "Associados", path: '/associates', resource_name: 'ASSOCIATES', icon: 'IconUsers', order: 2 },
      { name: "Dashboard", path: '/', resource_name: 'HOME', icon: 'IconLayoutDashboard', order: 1 },
    ]

    for (const menu of menusData) {
      try {
        const menuRes = await prisma.menu.upsert({
          where: { name: menu.name, path: menu.path },
          update: {
            resource: menu.resource_name ? { connect: { name: menu.resource_name } } : undefined,
            icon: menu.icon,
            order: menu.order,  
          },
          create: {
            name: menu.name,
            path: menu.path,
            resource: menu.resource_name ? { connect: { name: menu.resource_name } } : undefined,
            icon: menu.icon,
            order: menu.order,  
          },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Menu "${menuRes.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding menu "${menu.name}":`,
          error,
        );
      }
    }
  }
}
