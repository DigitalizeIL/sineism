"use client"

import { ChangeEventHandler, useMemo } from "react"
import clsx from "clsx"

export function Select(props: {
    className?: string
    placeholder?: string
    value?: string
    defaultValue?: string
    isInvalid?: boolean
    onChange?: ChangeEventHandler<HTMLSelectElement>
    options: { label: string; value: string | number | undefined }[]
}) {
    const selectedOption = useMemo(() => {
        return props.options.find(
            (option) => option.value === props.defaultValue
        )
    }, [props.defaultValue, props.options])

    return (
        <select
            value={props.value}
            onChange={props.onChange}
            placeholder={selectedOption?.label}
            className={clsx([
                props.className,
                "w-full",
                "border-2",
                "border-gray-300",
                "rounded-md",
                "focus:outline-none",
                "focus:ring-2",
                props.isInvalid ? "focus:ring-red-400" : "focus:ring-blue-400",
                "focus:border-transparent",
                "p-2",
                !props.value && "text-gray-400",
            ])}>
            <option
                value={"empty"}
                selected
                disabled>
                {props.placeholder || "Select"}
            </option>
            {props.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
