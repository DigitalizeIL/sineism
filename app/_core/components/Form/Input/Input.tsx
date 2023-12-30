"use client"

import {ChangeEvent} from "react"
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
    placeholder?: string
} & (
    TextInputProps |
    NumberInputProps
    )


export function Input<T extends string | number>(props: InputProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!props.onChange) {
            return
        }

        if (props.type === "number") {
            props.onChange(Number(event.target.value), event)
        } else if (props.type === "text") {
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
            value={props.value}
            onChange={onChange}
        />
    )
}
