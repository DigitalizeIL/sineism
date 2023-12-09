"use client"

import { ChangeEvent } from "react"
import clsx from "clsx"

export function Input<T extends string | number>(props: {
    value?: T
    defaultValue?: string
    className?: string
    name?: string
    onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
    type?: "text" | "number" | string
    placeholder?: string
}) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            let value: string | number = event.target.value

            if (props.type === "number") {
                value = value === "" ? "" : Number(value)
            }

            props.onChange(value as T, event)
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
            value={props.value}
            onChange={onChange}
        />
    )
}
