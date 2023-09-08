import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"

type PageProps = {
    params: {
        categoryId: string
    }
}

export default async function Page(props: PageProps) {
    const category = await categoriesService.getCategory(
        Number(props.params.categoryId),
        true
    )

    console.log(category)

    if (!category) {
        return notFound()
    }

    return (
        <div>
            <h1>{category.name}</h1>
            {category.posts?.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}
