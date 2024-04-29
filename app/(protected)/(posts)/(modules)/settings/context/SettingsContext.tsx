import { createContext, useContext } from "react"

import { SettingsObject } from "../lib/settings.interface"

export const SettingsContext = createContext<SettingsObject>(
    {} as SettingsObject
)

export const useSettings = () => {
    return useContext(SettingsContext)
}
