import "@/styles/globals.css"

import { Inter } from "next/font/google"
import { METADATA } from "@/app/consts"
import { Metadata } from "next"
import { Providers } from "@/app/Providers"
import React from "react"
import { Toaster } from "react-hot-toast"
import clsx from "clsx"
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
            className="h-full"
            dir={"rtl"}>
            <body
                className={clsx([inter.variable, "h-full"])}
                suppressHydrationWarning={true}>
                <Providers session={session}>
                    <Toaster position={"bottom-center"} />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
