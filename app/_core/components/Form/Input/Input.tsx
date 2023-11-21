"use client"

import { ChangeEvent } from "react"
import clsx from "clsx"

export const Input = (props: {
    value?: string
    defaultValue?: string
    className?: string
    name?: string
    onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
}) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event.target.value, event)
        }
    }

    return (
        <input
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            type={props.type || "text"}
            className={clsx([
                "border-2 border-gray-300 rounded-md p-2",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-blue-400",
                "focus:border-transparent",
                props.className,
            ])}
            value={props.value || ""}
            onChange={onChange}
        />
    )
}
