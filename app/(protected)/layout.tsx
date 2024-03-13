import "@/styles/globals.css"

import {
    SettingOptions,
    SettingsObject,
} from "./(posts)/(modules)/settings/lib/settings.interface"

import React from "react"
import { SettingsProvider } from "./(posts)/(modules)/settings/context/SettingsProvider"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"
import { settingsService } from "./(posts)/(modules)/settings/lib/settings.service"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
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
            <UserProvider>{children}</UserProvider>
        </SettingsProvider>
    )
}
