import {
    LOGIN_REDIRECT_URL,
    LOGIN_URL,
} from "@/app/(authentication)/components/AuthForm/consts"

import { Button } from "@/app/_core/components/Button"
import { CompleteRegistrationButton } from "./_components/CompleteRegistrationButton"
import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { RegisterPaymentModal } from "./_components/RegistrationPaymentModal"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { TEXTS } from "./texts"
import { createRegistrationOrder } from "./_actions/createRegistrationOrder"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

export default async function RegisterPaymentPage() {
    const session = await getAppServerSession()
    if (!session?.user) return

    const price = await settingsService.getSettingByKey(
        SettingKey.registration_cost_usd
    )

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h2>{TEXTS.welcome}</h2>
            <div className="w-24">
                {price?.value ? (
                    <RegisterPaymentModal
                        createOrder={createRegistrationOrder}
                        price={Number(price.value)}
                        userId={session.user.id}
                    />
                ) : (
                    <CompleteRegistrationButton />
                )}
            </div>
        </div>
    )
}
