import { Injectable } from '@nestjs/common';
import { IDeliveryFeeRepository } from '../delivery-fee.repository';

@Injectable()
export class DeliveryFeeRepository implements IDeliveryFeeRepository {}
