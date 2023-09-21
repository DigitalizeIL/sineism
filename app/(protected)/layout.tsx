import "@/styles/globals.css"
import React from "react"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <UserProvider>{children}</UserProvider>
}
