import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/components/Comment"
import { CommentHeader } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentHeader"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function CommentsPage(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )

    const comments = await commentsService.getAllComments({
        pagination: {
            page,
            perPage: postsPerPage?.value
                ? Number(postsPerPage?.value)
                : DEFAULT_PAGE_SIZE,
        },
    })

    return (
        <div className={"flex justify-center flex-col"}>
            <CommentHeader page={1} />
            <div
                className={
                    "flex justify-center items-center flex-col overflow-scroll h-auto"
                }>
                {comments.map((comment) => (
                    <Comment
                        comment={comment}
                        key={comment.id}
                    />
                )) || "No Comments"}
            </div>
        </div>
    )
}
