import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { PostFeedItem } from "@/app/(posts)/components/PostsFeed/PostFeedItem"
import { DEFAULT_PAGE_SIZE } from "@/app/(posts)/(modules)/categories/consts/pagination"
import { CategoryHeader } from "@/app/(posts)/(modules)/categories/components/CategoryHeader"

type PageProps = {
    params: {
        categoryId: string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const limit = DEFAULT_PAGE_SIZE

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
            <CategoryHeader
                category={category}
                page={page}
            />
            <div className={"flex flex-col justify-center items-center w-full"}>
                {category.posts?.map((post) => (
                    <PostFeedItem
                        page={page}
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
        </>
    )
}
