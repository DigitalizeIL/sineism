import { IconButton, IconProps } from "@/components/Icons/IconButton"

import { FaTrash } from "react-icons/fa"

export const DeleteIcon = (props: IconProps) => (
    <IconButton {...props}>
        <FaTrash />
    </IconButton>
)
