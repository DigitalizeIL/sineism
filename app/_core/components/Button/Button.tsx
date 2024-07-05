"use client"

import { FC, ReactNode, useMemo } from "react"

import { LoadingDots } from "@/components/LoadingDots"
import clsx from "clsx"
import { useFormStatus } from "react-dom"

type ButtonType = keyof typeof typesStyle

export type ButtonProps = {
    loading?: boolean
    useFormLoading?: boolean
    children: ReactNode | ReactNode[]
    type?: ButtonType | ButtonType[]
    htmlType?: "button" | "submit" | "reset"
    className?: string
    isDisabled?: boolean
    fullWidth?: boolean
    onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
    loading,
    children,
    type,
    htmlType,
    isDisabled,
    className,
    fullWidth,
    onClick,
    useFormLoading = loading === undefined,
}) => {
    const { pending } = useFormStatus()

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
            disabled={loading || isDisabled}
            type={htmlType}
            className={clsx([
                className,
                loading && "cursor-not-allowed border-gray-200 bg-gray-100",
                "flex h-10 px-2 items-center justify-center rounded-md border text-sm transition-all focus:outline-none",
                fullWidth && "w-full",
                isDisabled ? "bg-gray-200 hover:bg-gray-200" : styleClassnames,
            ])}>
            {loading || (useFormLoading && pending) ? (
                <LoadingDots color="#808080" />
            ) : (
                children
            )}
        </button>
    )
}

const typesStyle = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    ghost: "border-transparent bg-transparent text-black hover:bg-black hover:text-white",
    slim: "p-0 h-auto",
    "warning-outline": "border-yellow-600",
    danger: "border-red-600",
}
