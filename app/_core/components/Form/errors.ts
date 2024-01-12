import { FormSubmitResponse } from "@/components/Form/types"

export const getMessageFromFormSubmitError = (
    formSubmitError: FormSubmitResponse["error"]
): string => {
    let message = ""

    if (formSubmitError) {
        message = `*${formSubmitError.message}*`

        if (formSubmitError.data) {
            message += `\nֿ${Object.values(formSubmitError.data).join("\n")}`
        }
    }

    return message
}
