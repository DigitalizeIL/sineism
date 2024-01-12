import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { CommentsModal } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentsModal"
import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentFormContainer"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return

    const quotaObject = await quotaService.getQuota(session.user.id)
    const shouldPay = !quotaObject || quotaObject.quota <= 0

    return (
        <div>
            <div className={"flex items-center justify-end"}>
                {shouldPay ? (
                    <PaymentModal />
                ) : (
                    <CommentsModal>
                        <CommentFormContainer />
                        <div className={"-mt-2 m-2 flex items-center gap-1"}>
                            <span>נשאר לך</span>
                            <span>{quotaObject?.quota}</span>
                            <span>תגובות</span>
                        </div>
                    </CommentsModal>
                )}
            </div>
        </div>
    )
}
