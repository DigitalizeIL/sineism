export type FormSubmitResponse = {
    error?: {
        message: string
        data?: Record<string, any>
    }
    data?: Record<string, any>
}

export type FormSubmitHandler = (
    formData: FormData
) => Promise<FormSubmitResponse>
