import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentFormContainer"
import { CommentsModal } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentsModal"
import { PaymentContainer } from "./PaymentContainer"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { TEXTS } from "./texts"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return

    const quotaObject = await quotaService.getQuota(session.user.id)
    const amountSetting = await settingsService.getSettingByKey(
        SettingKey.comments_amount_per_purchase
    )

    const priceSetting = await settingsService.getSettingByKey(
        SettingKey.comments_cost_usd
    )
    const price = Number(priceSetting?.value)
    const amount = Number(amountSetting?.value)

    const shouldPay = price > 0 && (!quotaObject || quotaObject.quota <= 0)

    if (
        price === undefined ||
        amount === undefined ||
        isNaN(amount) ||
        isNaN(amount)
    ) {
        return <></>
    }

    return (
        <div>
            <div className={"flex items-center justify-end"}>
                {shouldPay ? (
                    <PaymentContainer
                        userId={session.user.id}
                        amount={amount}
                        price={price}
                    />
                ) : (
                    <CommentsModal>
                        <CommentFormContainer />
                        {price > 0 && (
                            <div
                                className={"-mt-2 m-2 flex items-center gap-1"}>
                                <span>{TEXTS.youLeft}</span>
                                <span>{quotaObject?.quota}</span>
                                <span>{TEXTS.comments}</span>
                            </div>
                        )}
                    </CommentsModal>
                )}
            </div>
        </div>
    )
}
