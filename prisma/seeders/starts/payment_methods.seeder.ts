import { PrismaClient } from '@prisma/client';
import { PaymentMethodsName } from '../../../src/common/enums/payment-methods.enum';

const prisma = new PrismaClient();

export class PaymentsMethodsSeeder {
  async seed() {
    const paymentMethods = Object.values(PaymentMethodsName);

    for (const paymentMethodName of paymentMethods) {
      try {
        const payment = await prisma.paymentMethod.upsert({
          where: { name: paymentMethodName },
          update: {},
          create: { name: paymentMethodName },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Payment method "${payment.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding payment method "${paymentMethodName}":`,
          error,
        );
      }
    }
  }
}
