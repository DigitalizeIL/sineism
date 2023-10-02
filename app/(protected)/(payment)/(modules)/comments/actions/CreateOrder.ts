"use server"

import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { orderService } from "@/app/(protected)/(payment)/lib/OrderService"

export const createOrder = async (
    order: {
        orderId: string
        product: string
        price: number
    },
    userId: number
) => {
    console.log("createOrder", order)
    await orderService.createOrder({
        ...order,
        userId,
    })
    await quotaService.addQuota(userId, 3)
    console.log("DONEEE", order)
}
