import { Injectable } from '@nestjs/common';
import { IOrderStatusRepository } from '../order-status.repository';
import { OrderStatus } from '@prisma/client';
import { GetOrderStatusRequestDto } from '../../dtos/order-status/order-status-request.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class OrderStatusRepository implements IOrderStatusRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getOrderStatus(query: GetOrderStatusRequestDto): Promise<OrderStatus[]> {
    return this.prismaService.orderStatus.findMany({
      where: {
        name: {
          contains: query.search_term
        }
      }
    })
  }

}
