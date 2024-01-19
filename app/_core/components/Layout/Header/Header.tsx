import React from "react"
import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { Logo } from "@/components/Logo"
import { LINKS } from "@/components/Layout/Header/consts"
import { HeaderLink } from "@/components/Layout/Header/HeaderLink"
import { CATEGORIES } from "@/app/(protected)/(posts)/(modules)/categories/consts/categories"

export const Header = async () => {
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
                        icon={link.icon}
                    />
                ))}

                <div className={"flex flex-row-reverse h-full"}>
                    {CATEGORIES.map((category) => (
                        <HeaderLink
                            key={category.id}
                            href={`/categories/${category.path}`}
                            label={category.name}
                            className={"h-full p-2"}
                        />
                    ))}
                </div>
            </nav>
            <div className={"flex items-center justify-end"}>
                <AuthStatus />
            </div>
        </div>
    )
}
