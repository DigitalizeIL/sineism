"use client"

import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { Select } from "@/components/Form/Select/Select"

export function ControlledSelect<Dto extends FieldValues>(
    props: {
        className?: string
        placeholder?: string
        options: { label: string; value: string | number | undefined }[]
    } & UseControllerProps<Dto>
) {
    const { field, fieldState } = useController(props)

    return (
        <Select
            {...props}
            {...field}
        />
    )
}
