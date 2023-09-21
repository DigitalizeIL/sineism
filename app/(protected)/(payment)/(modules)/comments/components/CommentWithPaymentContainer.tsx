import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { CreateCommentForm } from "@/app/(protected)/(posts)/(modules)/comments/components/CreateCommentForm"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const CommentWithPaymentContainer = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return

    const quota = await quotaService.getQuota(session.user.id)

    return (
        <div>
            <div className={"flex items-center justify-end"}>
                {!quota || quota.quota <= 0 ? (
                    <PaymentModal />
                ) : (
                    <CreateCommentForm />
                )}
            </div>
        </div>
    )
}
