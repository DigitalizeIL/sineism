import { Metadata, Viewport } from "next"
import React, { ReactNode } from "react"

import { Header } from "@/components/Layout"
import { METADATA } from "@/app/(protected)/(posts)/posts.consts"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { PostsFloatingQuickActions } from "@/app/(protected)/(posts)/components/PostsFloatingQuickActions"

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
export const viewport: Viewport = {
    themeColor: METADATA.themeColor,
}

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
            <PostsFloatingQuickActions>
                <PostCreateOrEditFormContainer />
            </PostsFloatingQuickActions>
        </>
    )
}
