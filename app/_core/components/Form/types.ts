export type FormErrors = {
    formErrors: string[]
    fieldErrors: Record<string, string[]>
}

export type FormResponse = {
    success: boolean
    errors?: FormErrors
}
