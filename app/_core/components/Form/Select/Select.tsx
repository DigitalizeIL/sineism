"use client"

import { ChangeEvent, useEffect, useState } from "react"

import Select2 from "react-select"
import clsx from "clsx"

export type Option = {
    label: string
    value: string | number
}
type SelectProps = {
    name: string
    className?: string
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
            className={clsx([
                props.className,
                "w-full border-2 border-gray-300 rounded-md  p-2",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent",
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
