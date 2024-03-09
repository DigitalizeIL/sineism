import "@/styles/globals.css"

import React from "react"
import { SettingKey } from "./(posts)/(modules)/settings/lib/settings.interface"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"
import { settingsService } from "./(posts)/(modules)/settings/lib/settings.service"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const priceSetting = await settingsService.getSettingByKey(
        SettingKey.registration_cost_usd
    )

    const price = Number(priceSetting?.value)
    const shouldPay = !!price && !isNaN(price)

    return <UserProvider isPaymentRequired={shouldPay}>{children}</UserProvider>
}
