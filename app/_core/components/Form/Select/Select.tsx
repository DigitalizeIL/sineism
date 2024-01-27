"use client"

import clsx from "clsx"
import { ChangeEvent, useEffect, useState } from "react"
import Select2 from "react-select"

export type Option = {
    label: string
    value: string | number
}
type SelectProps = {
    name: string
    className?: string
    defaultValue?: string | number
    value?: string | number
    placeholder?: string
    onChange?: (value: string | number) => void
    isMulti?: boolean
    options: Option[]
}

export const Select = (props: SelectProps) => {
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const options: readonly Option[] = props.options

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        props.onChange?.(e.target.value)
    }

    if (props.isMulti) {
        return (
            <Select2
                isMulti
                isSearchable
                options={props.options}
                placeholder={props.placeholder}
                name={props.name}
                styles={{
                    option: (base, props) => ({
                        ...base,
                        textAlign: "right",
                        // paddingInlineStart: "10px",
                    }),
                    placeholder: (base, props) => ({
                        ...base,
                        textAlign: "right",
                    }),
                }}
            />
        )
    }
    return (
        <select
            value={value || "empty"}
            onChange={change}
            name={props.name}
            aria-placeholder={props.placeholder}
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
