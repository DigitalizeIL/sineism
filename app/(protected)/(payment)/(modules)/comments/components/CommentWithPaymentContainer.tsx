import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentFormContainer"
import { CommentsModal } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentsModal"
import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { TEXTS } from "./texts"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return

    const quotaObject = await quotaService.getQuota(session.user.id)
    const shouldPay = !quotaObject || quotaObject.quota <= 0
    const price = await settingsService.getSettingByKey(
        SettingKey.comments_cost_usd
    )
    const amount = await settingsService.getSettingByKey(
        SettingKey.comments_amount_per_purchase
    )

    if (price?.value === undefined || amount?.value === undefined) {
        return <></>
    }

    return (
        <div>
            <div className={"flex items-center justify-end"}>
                {shouldPay ? (
                    <PaymentModal
                        title={TEXTS.buyComments}
                        product="Comments"
                        amount={Number(amount.value)}
                        price={Number(price.value)}
                    />
                ) : (
                    <CommentsModal>
                        <CommentFormContainer />
                        <div className={"-mt-2 m-2 flex items-center gap-1"}>
                            <span>{TEXTS.youLeft}</span>
                            <span>{quotaObject?.quota}</span>
                            <span>{TEXTS.comments}</span>
                        </div>
                    </CommentsModal>
                )}
            </div>
        </div>
    )
}
