import "server-only"

import { IOrder } from "@/app/(protected)/(payment)/lib/order.interface"
import prisma from "@/lib/prisma"

export class OrderService {
    async createOrder(orderData: IOrder): Promise<any> {
        return prisma.orders.create({
            data: orderData,
        })
    }
}

export const orderService = new OrderService()
