import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/components/Comment"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

type PageProps = {
    page: number
}

export async function CommentsFeed(props: PageProps) {
    const postsPerPageValue = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const postsPerPage = postsPerPageValue?.value
        ? Number(postsPerPageValue?.value)
        : DEFAULT_PAGE_SIZE

    const comments = await commentsService.getAllComments({
        pagination: {
            page: props.page,
            perPage: postsPerPage,
        },
    })

    return (
        <div
            className={
                "flex justify-center items-center flex-col overflow-scroll h-auto"
            }>
            {comments.map((comment) => (
                <Comment
                    page={props.page}
                    comment={comment}
                    key={comment.id}
                />
            ))}
        </div>
    )
}
