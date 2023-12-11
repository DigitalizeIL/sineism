import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { CommentsModal } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentsModal"
import { CommentForm } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"
import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentFormContainer"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return

    const quota = await quotaService.getQuota(session.user.id)
    const shouldPay = !quota || quota.quota <= 0

    return (
        <div>
            <div className={"flex items-center justify-end"}>
                {shouldPay ? (
                    <PaymentModal />
                ) : (
                    <CommentsModal>
                        <CommentFormContainer />
                    </CommentsModal>
                )}
            </div>
        </div>
    )
}
