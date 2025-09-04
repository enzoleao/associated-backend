import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IOrdersRepository } from '../orders.repository';
import { ICreateOrder } from '../../interfaces/create-order.interface';
import { Orders } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { paginate } from '@/common/helpers/paginate';
import { GetOrdersParamsRequestDto } from '../../dtos/get-orders/get-orders-request.dto';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cls: ClsService,

  ) {}

  async getOrders(paginationQueryDto: GetOrdersParamsRequestDto): Promise<any> {
   const {  search_term, order_status_id } = paginationQueryDto;

  return this.prismaService.orderStatus.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      orders: {
        where: {
          AND: [
            order_status_id?.length
              ? { order_status_id: { in: order_status_id } }
              : {},
            search_term
              ? {
                  OR: [
                    { id: { contains: search_term } },
                    { client: { name: { contains: search_term, mode: 'insensitive' } } },
                  ],
                }
              : {},
          ],
        },
        select: {
          id: true,
          total: true,
          client: {
            select: {
              name: true,
            },
          },
          order_status: {
            select: {
              name: true,
              color: true
            }
          },
          created_at: true,
        },
      },
    },
  });
}



    async getOrdersAnterior(paginationQueryDto: PaginationQueryDto): Promise<any> {
    return paginate({
      prisma: this.prismaService,
      model: 'orders',
      args: paginationQueryDto,
      searchFields: ['id', 'client.name'],
      select: {
        id: true,
        total: true,
        client: { select: { id: true, name: true } },
        order_status: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        products: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        created_at: true
      }
    });
  }



  async createOrder({ total, sub_total, discount, delivery_fee, address_id }: ICreateOrder): Promise<Orders>{
    const clientId = await this.cls.get('clientId')
    return this.prismaService.tenantQuery('orders', 'create', {
        data: {
            total,
            sub_total,
            discount,
            client_id: clientId,
            delivery_fee,
            client_address_id: address_id
        }
    })
   }
}
