import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

type LayoutProps = {
    params: {
        categoryId: string
    }
    children: ReactNode
}
export default async function Layout(props: LayoutProps) {
    const category = await categoriesService.getCategory(
        Number(props.params.categoryId)
    )

    if (!category) {
        return notFound()
    }

    return (
        <div>
            <h1>{category.name}</h1>
            {props.children}
        </div>
    )
}
