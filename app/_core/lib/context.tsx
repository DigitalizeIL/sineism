import "server-only"

import { cache } from "react"

export enum REQUEST_CONTEXT_KEYS {
    lastCursor = "lastCursor",
}

const requestContext = cache(() => {
    return new Map<REQUEST_CONTEXT_KEYS, any>()
})

export const setRequestContext = (key: REQUEST_CONTEXT_KEYS, value?: any) =>
    requestContext().set(key, value)

export function getRequestContext<T>(key: REQUEST_CONTEXT_KEYS) {
    return requestContext().get(key) as T
}
