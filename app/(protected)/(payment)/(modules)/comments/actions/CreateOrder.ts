"use server"

import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { orderService } from "@/app/(protected)/(payment)/lib/OrderService"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

export const createOrder = async (
    order: {
        orderId: string
        product: string
    },
    userId: number
) => {
    const price = await settingsService.getSettingByKey("comments_cost_usd")
    const amount = await settingsService.getSettingByKey(
        "comments_amount_per_purchase"
    )

    if (price?.value === undefined) {
        throw Error("No price")
    }

    if (amount === undefined) {
        throw Error("No amount")
    }

    console.log("createOrder", order)

    await orderService.createOrder({
        ...order,
        price: Number(price?.value),
        userId,
    })
    await quotaService.addQuota(userId, Number(amount))

    console.log("DONEEE", order)
}
