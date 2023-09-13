import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { CategoryHeader } from "@/app/(posts)/(modules)/categories/components/CategoryHeader"

type LayoutProps = {
    params: {
        categoryId: string
    }
    children: ReactNode
}
export default async function Layout(props: LayoutProps) {
    const category = await categoriesService.getCategory({
        id: Number(props.params.categoryId),
    })

    if (!category) {
        return notFound()
    }

    return (
        <div className={"w-full"}>
            <CategoryHeader category={category} />
            <div className={"flex flex-col justify-center items-center w-full"}>
                {props.children}
            </div>
        </div>
    )
}
