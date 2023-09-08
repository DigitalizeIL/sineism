"use client"

import Link from "next/link"
import clsx from "clsx"
import React from "react"
import { usePathname } from "next/navigation"

export const HeaderLink = (props: {
    href: string
    label: string
    className?: string
}) => {
    const pathname = usePathname()

    const isActive = pathname === props.href

    return (
        <Link
            className={clsx([
                isActive && "border-b-2 border-b-secondary text-secondary",
                "hover:border-b-secondary hover:border-b-2 transition-all",
                "h-full p-2 flex items-center justify-center",
                "text-xs",
                props.className,
            ])}
            href={props.href}>
            {props.label}
        </Link>
    )
}
