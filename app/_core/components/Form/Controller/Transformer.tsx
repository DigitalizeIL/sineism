import {
    ChangeHandler,
    Control,
    Controller,
    ControllerRenderProps,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form"
import { ComponentType } from "react"

export function ControllerPlus<
    Dto extends FieldValues,
    Value extends PathValue<Dto, Path<Dto>>,
>({
    control,
    transform,
    name,
    defaultValue,
    component,
    ...props
}: {
    control: Control<Dto>
    transform: {
        input?: (value: any) => Value
        output?: (value: any) => Value
    }
    name: Path<Dto>
    defaultValue?: Value
    component: ComponentType<{ onChange: ChangeHandler; value: Value }>
}) {
    const Component = component

    const createChangeHandler = (
        field: ControllerRenderProps<Dto, Path<Dto>>
    ): ChangeHandler => {
        return async (e) => {
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
