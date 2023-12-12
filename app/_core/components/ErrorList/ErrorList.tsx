import { FormErrors } from "@/components/Form/types"

export const ErrorList = ({ errors }: { errors?: FormErrors }) => {
    if (!errors || !Object.keys(errors.fieldErrors).length) {
        return null
    }

    return (
        <ul className={"list-none"}>
            {Object.entries(errors.fieldErrors).map(([field, error]) => (
                <li
                    className={"list-item"}
                    key={field}>
                    <b>{field}</b>
                    <ul className={"list-none"}>
                        {error.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}
