import { CommentHeader } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentHeader"
import { CommentsFeed } from "../components/CommentsFeed"
import { Suspense } from "react"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function CommentsPage(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)

    return (
        <div className={"flex justify-center flex-col"}>
            <CommentHeader page={page} />
            <Suspense>
                <CommentsFeed page={page} />
            </Suspense>
        </div>
    )
}
