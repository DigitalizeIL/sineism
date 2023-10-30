"use client"

import { ReactNode, useMemo } from "react"
import clsx from "clsx"
import { LoadingDots } from "@/components/LoadingDots"

type ButtonType = keyof typeof typesStyle

type ButtonProps = {
    loading?: boolean
    children: ReactNode | ReactNode[]
    type?: ButtonType | ButtonType[]
    className?: string
    onClick?: () => void
}

export const Button = ({
    loading,
    children,
    type,
    className,
    onClick,
}: ButtonProps) => {
    const styleClassnames = useMemo(() => {
        if (!type) return ""

        if (Array.isArray(type)) {
            return type.map((type) => typesStyle[type]).join(" ")
        }

        return typesStyle[type]
    }, [type])

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={clsx([
                className,
                loading && "cursor-not-allowed border-gray-200 bg-gray-100",
                "flex h-10 px-1 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none",
                styleClassnames,
            ])}>
            {loading ? <LoadingDots color="#808080" /> : children}
        </button>
    )
}

const typesStyle = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    ghost: "border-transparent bg-transparent text-black hover:bg-black hover:text-white",
    slim: "p-0 h-auto",
}
