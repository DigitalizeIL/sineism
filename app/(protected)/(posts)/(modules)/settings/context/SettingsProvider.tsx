"use client"

import { PropsWithChildren } from "react"
import { SettingsContext } from "./SettingsContext"
import { SettingsObject } from "../lib/settings.interface"

export const SettingsProvider = (
    props: PropsWithChildren<{ settings: SettingsObject }>
) => {
    return (
        <SettingsContext.Provider value={props.settings}>
            {props.children}
        </SettingsContext.Provider>
    )
}
