"use client"

import Link from "next/link"
import clsx from "clsx"
import React from "react"
import { usePathname } from "next/navigation"
import Icon from "@/components/Icons/Icon"

export const HeaderLink = (props: {
    href: string
    label?: string
    className?: string
    icon?: string
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
                "text-center",
                props.className,
            ])}
            href={props.href}>
            {props.label}
            {props.icon ? (
                <Icon
                    iconName={props.icon}
                    height={16}
                    width={16}
                />
            ) : null}
        </Link>
    )
}
