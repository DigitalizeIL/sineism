import React from "react"
import {
    ControllerRenderProps,
    FieldValues,
    Path,
    useController,
    UseControllerProps,
} from "react-hook-form"

export type SubComponentProps<ComponentType> =
    (ComponentType extends React.ComponentType<infer ComponentProps>
        ? ComponentProps
        : never) & {
        Component: ComponentType
    }

type SubComponentPropsToExclude<Dto extends FieldValues> =
    ControllerRenderProps<Dto, Path<Dto>>

type SubComponentExternalInterface<
    ComponentType,
    Dto extends FieldValues,
> = Omit<
    SubComponentProps<ComponentType>,
    keyof SubComponentPropsToExclude<Dto>
>

export function FormField<
    ComponentType extends React.ComponentType<any>,
    Dto extends FieldValues,
>({
    Component,
    ...props
}: SubComponentExternalInterface<ComponentType, Dto> &
    UseControllerProps<Dto>) {
    const { field, fieldState } = useController(props)

    return (
        <div>
            <Component
                {...props}
                {...field}
            />

            <div>{fieldState.error?.message}</div>
        </div>
    )
}
