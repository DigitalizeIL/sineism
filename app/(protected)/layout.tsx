import "@/styles/globals.css"

import React from "react"
import { SettingsProviderContainer } from "./(posts)/(modules)/settings/context/SettingsProvider.container"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SettingsProviderContainer>
            <UserProvider>{children}</UserProvider>
        </SettingsProviderContainer>
    )
}
