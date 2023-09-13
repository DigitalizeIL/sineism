import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { PostFeedItem } from "@/app/(posts)/components/PostsFeed/PostFeedItem"

type PageProps = {
    params: {
        categoryId: string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const limit = 3

    const category = await categoriesService.getCategory({
        id: Number(props.params.categoryId),
        withPosts: true,
        pagination: {
            page,
            perPage: limit,
        },
    })

    if (!category) {
        return notFound()
    }

    return (
        <>
            {category.posts?.map((post) => (
                <PostFeedItem
                    page={page}
                    post={post}
                    key={post.id}
                />
            ))}
        </>
    )
}
