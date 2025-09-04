import { OrderStatus } from "@prisma/client";
import { GetOrderStatusRequestDto } from "../dtos/order-status/order-status-request.dto";

export interface IOrderStatusRepository {
    getOrderStatus(query: GetOrderStatusRequestDto): Promise<OrderStatus[]>
}
