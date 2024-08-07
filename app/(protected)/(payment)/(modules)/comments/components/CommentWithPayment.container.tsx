import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm.container"
import { CommentsPaymentContainer } from "./Payment.container"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { TEXTS } from "../commentsPayment.texts"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { quotaRepository } from "@/app/(protected)/(payment)/(modules)/comments/lib/quota.repository"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession(true)

    const quotaObject = await quotaRepository.getQuota(session.user.id)
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
                    <CommentsPaymentContainer
                        userId={session.user.id}
                        amount={amount}
                        price={price}
                    />
                ) : (
                    <>
                        <CommentFormContainer />
                        {price > 0 && (
                            <div className={"m-2 flex items-center gap-1"}>
                                <span>{TEXTS.youLeft}</span>
                                <span>{quotaObject?.quota}</span>
                                <span>{TEXTS.comments}</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
