import { PropsWithChildren } from "react"
import { SettingsObject } from "../lib/settings.interface"
import { SettingsProvider } from "./SettingsProvider"
import { settingsService } from "../lib/settings.service"

export const SettingsProviderContainer = async (props: PropsWithChildren) => {
    const settings = await settingsService.getSettings()
    const settingsObject = settings.reduce(
        (acc, setting) => ({
            ...acc,
            [setting.key]: isNaN(Number(setting.value))
                ? setting.value
                : Number(setting.value),
        }),
        {} as SettingsObject
    )

    return (
        <SettingsProvider settings={settingsObject}>
            {props.children}
        </SettingsProvider>
    )
}
