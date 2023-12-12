"use client"

import clsx from "clsx"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

export const Select = (props: {
    name: string
    className?: string
    defaultValue?: string | number
    value?: string | number
    placeholder?: string
    onChange?: (value: string | number) => void
    options: { label: string; value: string | number | undefined }[]
}) => {
    const selectedOption = useMemo(() => {
        return props.options.find(
            (option) => option.value === props.defaultValue
        )
    }, [props.defaultValue, props.options])

    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        props.onChange?.(e.target.value)
    }

    return (
        <select
            value={value || "empty"}
            onChange={change}
            name={props.name}
            placeholder={selectedOption?.label}
            className={clsx([
                props.className,
                "w-full",
                "border-2",
                "border-gray-300",
                "rounded-md",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-blue-400",
                "focus:border-transparent",
                "p-2",
                !value && "text-gray-400",
            ])}>
            <option
                value={"empty"}
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
