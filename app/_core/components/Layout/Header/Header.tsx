import React from "react"
import Link from "next/link"
import clsx from "clsx"
import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { Logo } from "@/components/Logo"
import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { LINKS } from "@/components/Layout/Header/consts"

export const Header = async () => {
    const pathname = 1

    const categories = await categoriesService.getAllCategories()

    return (
        <div
            className={
                "flex justify-between items-center px-4 bg-primary shadow h-14"
            }>
            <Logo />
            <nav className={"h-14 flex items-center justify-center flex-1"}>
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
                        isActive={pathname === link.id}
                        label={link.name}
                        className={"h-full p-2"}
                    />
                ))}
            </nav>
            <div>
                <AuthStatus />
            </div>
        </div>
    )
}

const HeaderLink = (props: {
    href: string
    label: string
    className?: string
    isActive?: boolean
}) => {
    return (
        <Link
            className={clsx([
                props.isActive && "border-b-2 border-b-secondary",
                "hover:border-b-secondary hover:border-b-2",
                "h-full p-2 flex items-center justify-center",
                "text-xs",
                props.className,
            ])}
            href={props.href}>
            {props.label}
        </Link>
    )
}
