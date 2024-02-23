"use server"

import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { orderService } from "@/app/(protected)/(payment)/lib/OrderService"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

export const createOrder = async (
    order: {
        orderId: string
        product: string
    },
    userId: number
) => {
    try {
        const price = await settingsService.getSettingByKey(
            SettingKey.comments_cost_usd
        )
        const amount = await settingsService.getSettingByKey(
            SettingKey.comments_amount_per_purchase
        )

        if (price?.value === undefined) {
            throw Error("No price")
        }

        if (amount?.value === undefined) {
            throw Error("No amount")
        }

        console.log("createOrder", order)

        await orderService.createOrder({
            ...order,
            price: Number(price?.value),
            userId,
        })
        await quotaService.addQuota(userId, Number(amount.value))

        console.log("DONEEE", order)

        return true
    } catch (e) {
        console.error(e)

        return false
    }
}
