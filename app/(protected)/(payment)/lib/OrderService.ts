import "server-only"

import { IOrder } from "@/app/(protected)/(payment)/lib/IOrder"
import prisma from "@/lib/prisma"

export class OrderService {
    async createOrder(orderData: IOrder): Promise<any> {
        return prisma.orders.create({
            data: orderData,
        })
    }
}

export const orderService = new OrderService()
