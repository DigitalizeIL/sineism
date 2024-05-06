import { LINKS, MANAGEMENT_PATH } from "@/components/Layout/Header/consts"

import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { HeaderLink } from "@/components/Layout/Header/HeaderLink"
import { Logo } from "@/components/Logo"
import React from "react"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const Header = async () => {
    const session = await getAppServerSession()

    const categories = await categoriesService.getAllCategories()

    return (
        <div
            dir={"ltr"}
            className={"grid grid-cols-3 px-4 sticky top-0 z-10 bg-primary shadow h-14"}>
            <div className={"flex items-center justify-start"}>
                <Logo />
            </div>

            <nav className={"h-14 flex items-center justify-center"}>
                {LINKS.map((link) => (
                    <HeaderLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        icon={link.icon}
                    />
                ))}
                <div className={"flex flex-row-reverse h-full"}>
                    {categories.map((category) => (
                        <HeaderLink
                            key={category.id}
                            href={`/categories/${category.path}`}
                            label={category.name}
                            className={"h-full p-2"}
                        />
                    ))}
                </div>

                {session?.user?.role === UserRole.admin && (
                    <HeaderLink
                        href={MANAGEMENT_PATH}
                        label={"Management"}
                    />
                )}
            </nav>
            <div className={"flex items-center justify-end"}>
                <AuthStatus />
            </div>
        </div>
    )
}
