import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import React from "react"
import { METADATA } from "@/app/consts"
import { Providers } from "@/app/Providers"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: METADATA.title,
    description: METADATA.description,
    twitter: {
        card: "summary_large_image",
        title: METADATA.title,
        description: METADATA.description,
    },
    metadataBase: new URL(METADATA.base),
    themeColor: METADATA.themeColor,
}
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getAppServerSession()

    return (
        <html
            lang="en"
            dir={"rtl"}>
            <body
                className={inter.variable}
                suppressHydrationWarning={true}>
                <Providers session={session}>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
