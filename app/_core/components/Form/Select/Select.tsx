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
    defaultValue?: Option["value"]
}

export const Select = (props: SelectProps) => {
    if (props.isMulti) {
        return (
            <Select2
                isMulti
                isSearchable
                defaultValue={props.options.find(
                    (option) => option.value === props.defaultValue
                )}
                options={props.options}
                placeholder={props.placeholder}
                name={props.name}
                styles={{
                    option: (base) => ({
                        ...base,
                        textAlign: "right",
                        // paddingInlineStart: "10px",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        textAlign: "right",
                    }),
                }}
            />
        )
    }

    return <VanilaSelect {...props} />
}

const VanilaSelect = ({
    value: _value,
    defaultValue,
    options,
    name,
    className,
    placeholder,
    onChange,
}: SelectProps) => {
    const [value, setValue] = useState(_value || defaultValue)

    useEffect(() => {
        setValue(_value !== undefined ? _value : defaultValue)
    }, [_value, defaultValue])

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        onChange?.(e.target.value)
    }

    return (
        <select
            value={value || "empty"}
            onChange={change}
            name={name}
            className={clsx([
                className,
                "w-full border-2 border-gray-300 rounded-md  p-2",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent",
                !value && "text-gray-400",
            ])}>
            <option
                value={"empty"}
                disabled>
                {placeholder || "Select"}
            </option>
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
