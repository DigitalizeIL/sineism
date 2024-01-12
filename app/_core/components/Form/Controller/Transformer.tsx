import {
    Control,
    Controller,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form"
import { ChangeEvent } from "react"

type ReactHookFormTypes<Value, Dto extends FieldValues> = {
    control: Control<Dto>
    transform: {
        input?: (changeEvent: ChangeEvent<any>) => Value
        output?: (changeEvent: ChangeEvent<any>) => Value
    }
    name: Path<Dto>
    defaultValue?: Value
}

export type SubComponentProps<ComponentType> =
    (ComponentType extends React.ComponentType<infer ComponentProps>
        ? ComponentProps
        : never) & {
        Component: ComponentType
    }

export function ControllerPlus<
    Dto extends FieldValues,
    Value extends PathValue<Dto, Path<Dto>>,
    ComponentType extends React.ComponentType<any>,
>({
    control,
    transform,
    name,
    defaultValue,
    Component,
    ...props
}: SubComponentProps<ComponentType> & ReactHookFormTypes<Value, Dto>) {
    const createChangeHandler = (field: any) => {
        return async (e: ChangeEvent<any>) => {
            field.onChange(transform?.output ? transform.output(e) : e)
        }
    }

    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={name}
            render={({ field }) => (
                <Component
                    {...props}
                    onChange={createChangeHandler(field)}
                    value={
                        transform.input
                            ? transform.input(field.value)
                            : field.value
                    }
                />
            )}
        />
    )
}
