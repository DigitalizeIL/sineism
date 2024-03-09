"use server"

import { CreateOrderFunction } from "@/app/(protected)/(payment)/lib/order.types"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { orderService } from "@/app/(protected)/(payment)/lib/order.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"
import { usersService } from "@/app/(authentication)/lib/services/users.service"

export const createRegistrationOrder: CreateOrderFunction = async (
    orderData,
    userId
) => {
    try {
        const price = await settingsService.getSettingByKey(
            SettingKey.registration_cost_usd
        )

        if (price?.value === undefined) {
            throw Error("No price")
        }

        await orderService.createOrder({
            ...orderData,
            price: Number(price?.value),
            userId,
        })

        await usersService.activateSubscription(userId)

        return true
    } catch (e) {
        console.error(e)

        return false
    }
}
