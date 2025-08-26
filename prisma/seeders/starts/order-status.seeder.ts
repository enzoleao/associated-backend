import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderStatusSeeder {
  async seed() {
    const orderStatusData = [
    { name: 'Aguardando Confirmação', color: '#FFA500' },  
    { name: 'Pedido Confirmado',      color: '#007BFF' },  
    { name: 'Em Preparo',             color: '#17A2B8' },  
    { name: 'Pronto para Retirada',   color: '#6F42C1' },  
    { name: 'Pronto para Entrega',    color: '#28A745' },
    { name: 'Em Rota de Entrega',     color: '#20C997' },  
    { name: 'Pedido Entregue',        color: '#343A40' },
    { name: 'Pedido Cancelado',       color: '#DC3545' },
    ];
    for (const orderStatus of orderStatusData) {
      try {
        const orderStatusData = await prisma.orderStatus.upsert({
          where: { name: orderStatus.name },
          update: {
            name: orderStatus.name,
            color: orderStatus.color
          },
          create: {
            name: orderStatus.name,
            color: orderStatus.color
          },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Order status "${orderStatusData.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding order status "${orderStatus.name}":`,
          error,
        );
      }
    }
  }
}
