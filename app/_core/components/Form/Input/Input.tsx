"use client"

import { ChangeEvent } from "react"
import clsx from "clsx"

type TextInputProps = {
    value?: string
    defaultValue?: string
    type?: "text"
    onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

type NumberInputProps = {
    value?: number
    defaultValue?: number
    type?: "number"
    onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void
}

type InputProps = {
    className?: string
    name?: string
    hidden?: boolean
    placeholder?: string
    ltr?: boolean
} & (TextInputProps | NumberInputProps)

export function Input({
    onChange,
    name,
    hidden,
    placeholder,
    ltr,
    value,
    className,
    defaultValue,
    type,
}: InputProps) {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            return
        }

        if (type === "number") {
            onChange(Number(event.target.value), event)
        } else if (type === "text") {
            onChange(event.target.value, event)
        }
    }

    return (
        <input
            placeholder={placeholder}
            defaultValue={defaultValue}
            name={name}
            dir={ltr ? "ltr" : "rtl"}
            type={hidden ? "hidden" : type || "text"}
            className={clsx([
                "border-2 border-gray-300 rounded-md p-2",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-blue-400",
                "focus:border-transparent",
                className,
            ])}
            value={value}
            onChange={onChangeHandler}
        />
    )
}
