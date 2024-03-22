"use client"

import { PropsWithChildren } from "react"
import clsx from "clsx"

type LabelProps = {
    className?: string
    text: string
} & PropsWithChildren

export function Label({ children, className, text }: LabelProps) {
    return (
        <label className={clsx(["text-right", "mt-2", className])}>
            <span>{text}</span>
            <div className="mt-1">{children}</div>
        </label>
    )
}
