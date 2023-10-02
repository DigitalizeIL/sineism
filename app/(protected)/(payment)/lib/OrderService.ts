import "server-only"

import prisma from "@/lib/prisma"
import { IQuota } from "@/app/(protected)/(payment)/(modules)/comments/lib/IQuota"

export interface OrderService {
    createOrder(orderData: {
        orderId: string
        userId: number
        product: string
        price: number
    }): void
}

export const createOrderService = (): OrderService => {
    const createOrder = async (orderData: {
        orderId: string
        userId: number
        product: string
        price: number
    }): Promise<IQuota | null> => {
        return prisma.orders.create(orderData)
    }

    return {
        createOrder,
    }
}

export const orderService = createOrderService()
