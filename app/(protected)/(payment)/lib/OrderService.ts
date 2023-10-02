import "server-only"

import prisma from "@/lib/prisma"
import { IOrder } from "@/app/(protected)/(payment)/lib/IOrder"

export interface OrderService {
    createOrder(orderData: {
        orderId: string
        userId: number
        product: string
        price: number
    }): Promise<void>
}

export const createOrderService = (): OrderService => {
    const createOrder = async (orderData: IOrder): Promise<void> => {
        prisma.orders.create({
            data: orderData,
        })
    }

    return {
        createOrder,
    }
}

export const orderService = createOrderService()
