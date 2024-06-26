import { COMMENTS_LINK } from "@/components/Layout/Header/consts"
import Link from "next/link"
import { categoriesService } from "../lib/categories.service"

export const CategoriesPage = async () => {
    const categories = await categoriesService.getAllCategories()

    return (
        <div className={"flex justify-center items-center h-screen"}>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={"flex justify-center items-center"}>
                    <Link
                        href={`/categories/${category.path}`}
                        passHref>
                        <button
                            className={
                                "w-64 h-64 bg-primary rounded-xl shadow-lg m-4 flex justify-center items-center cursor-pointer" +
                                "hover:bg-primary-600 hover:shadow-xl"
                            }>
                            {category.name}
                        </button>
                    </Link>
                </div>
            ))}

            <div className={"flex justify-center items-center"}>
                <Link
                    href={COMMENTS_LINK.href}
                    passHref>
                    <button
                        className={
                            "w-64 h-64 bg-primary rounded-xl shadow-lg m-4 flex justify-center items-center cursor-pointer" +
                            "hover:bg-primary-600 hover:shadow-xl"
                        }>
                        {COMMENTS_LINK.label}
                    </button>
                </Link>
            </div>
        </div>
    )
}
