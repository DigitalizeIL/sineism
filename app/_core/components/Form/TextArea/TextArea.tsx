"use client"

import clsx from "clsx"
import { ChangeEventHandler } from "react"

export type TextAreaProps = {
    placeholder?: string
    className?: string
    rows?: number
    value: string
    isInvalid?: boolean
    onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export function TextArea(props: TextAreaProps) {
    return (
        <textarea
            onChange={props.onChange}
            value={props.value}
            rows={props.rows || 3}
            placeholder={props.placeholder}
            className={clsx([
                "border-2 border-gray-300 rounded-md p-2",
                "focus:outline-none",
                "focus:ring-2",
                "focus:border-transparent",
                props.isInvalid ? "focus:ring-red-400" : "focus:ring-blue-400",
                props.className,
            ])}
        />
    )
}
