import {
    LOGIN_REDIRECT_URL,
    LOGIN_URL,
} from "@/app/(authentication)/components/AuthForm/auth.consts"

import { Button } from "@/app/_core/components/Button"
import { CompleteRegistrationButton } from "../components/CompleteRegistrationButton"
import { PaymentModal } from "@/app/(protected)/(payment)/components/PaymentModal"
import { RegisterPaymentModal } from "../components/RegistrationPaymentModal"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { TEXTS } from "../register.texts"
import { createRegistrationOrder } from "../lib/createRegistrationOrder.action"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"
import { SignoutText } from "@/app/(authentication)/components/SignoutText"

export default async function RegisterPaymentPage() {
    const session = await getAppServerSession()
    if (!session?.user) return

    const priceSetting = await settingsService.getSettingByKey(
        SettingKey.registration_cost_usd
    )

    const price = Number(priceSetting?.value)
    const shouldPay = price && !isNaN(price)

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h2 className="text-lg bold mb-4">{TEXTS.welcome}</h2>
            <div className="flex flex-col items-center gap-2">
                {shouldPay ? (
                    <RegisterPaymentModal
                        createOrder={createRegistrationOrder}
                        price={price}
                        userId={session.user.id}
                    />
                ) : (
                    <CompleteRegistrationButton />
                )}
                <SignoutText />
            </div>
        </div>
    )
}
