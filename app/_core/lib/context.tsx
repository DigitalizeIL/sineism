import "server-only"

import { cache } from "react"

type SetterFunction<T> = (value: T) => void
type GetterFunction<T> = () => T

export function serverContext<T>(
    defaultValue: T
): [GetterFunction<T>, SetterFunction<T>] {
    const getRef = cache(() => ({ current: defaultValue }))

    const getValue = (): T => getRef().current

    const setValue = (value: T) => {
        getRef().current = value
    }

    return [getValue, setValue]
}
