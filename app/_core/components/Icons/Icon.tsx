import React from "react"
import Image from "next/image"

type IconProps = {
    iconName: string
    height?: number
    width?: number
    [key: string]: any
}

const Icon = ({ iconName, height = 20, width = 20, ...props }: IconProps) => {
    return (
        <Image
            src={`/icons/${iconName}.svg`} // Assuming the icons are SVG files
            alt={iconName}
            width={width}
            height={height}
            {...props}
        />
    )
}

export default Icon
