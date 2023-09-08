import React from "react"
import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { Logo } from "@/components/Logo"
import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { LINKS } from "@/components/Layout/Header/consts"
import { HeaderLink } from "@/components/Layout/Header/HeaderLink"

export const Header = async () => {
    const categories = await categoriesService.getAllCategories()

    return (
        <div
            dir={"ltr"}
            className={"grid grid-cols-3 px-4 bg-primary shadow h-14"}>
            <div className={"flex items-center justify-start"}>
                <Logo />
            </div>

            <nav className={"h-14 flex items-center justify-center"}>
                {LINKS.map((link) => (
                    <HeaderLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                    />
                ))}

                {categories.map((link) => (
                    <HeaderLink
                        key={link.id}
                        href={`/categories/${link.id}`}
                        label={link.name}
                        className={"h-full p-2"}
                    />
                ))}
            </nav>
            <div className={"flex items-center justify-end"}>
                <AuthStatus />
            </div>
        </div>
    )
}
