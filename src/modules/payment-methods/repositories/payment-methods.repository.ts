import { Injectable } from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';

export interface IPaymentMethodsRepository {
    getPaymentMethods(): Promise<PaymentMethod[]>;
}
