"use client"

import { PropsWithChildren } from "react"

type LabelProps = {
    className?: string
    text: string
} & PropsWithChildren

export function Label({ children, className, text }: LabelProps) {
    return (
        <label className={className}>
            <span>{text}</span>
            <div className="mt-1">{children}</div>
        </label>
    )
}
