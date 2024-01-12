"use client"

import { CATEGORIES } from "@/app/(protected)/(posts)/(modules)/categories/consts/categories"
import Link from "next/link"
import { COMMENTS_LINK } from "@/components/Layout/Header/consts"

export default function CategoriesPage() {
    return (
        <div className={"flex justify-center items-center h-screen"}>
            {CATEGORIES.map((category) => (
            <div
                key={COMMENTS_LINK.href}
                className={"flex justify-center items-center"}>
                    <Link
                        href={category.path}
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
