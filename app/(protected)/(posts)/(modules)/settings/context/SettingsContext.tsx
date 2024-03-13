import { ISettings, SettingsObject } from "../lib/settings.interface"
import { createContext, useContext } from "react"

export const SettingsContext = createContext<SettingsObject>(
    {} as SettingsObject
)

export const useSettings = () => {
    return useContext(SettingsContext)
}
