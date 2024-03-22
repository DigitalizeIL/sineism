import { Metadata, Viewport } from "next"
import {
    REQUEST_CONTEXT_KEYS,
    setRequestContext,
} from "@/app/_core/lib/context"

import { DEFAULT_PAGE_SIZE } from "./(modules)/categories/consts/pagination"
import { Header } from "@/components/Layout"
import { METADATA } from "@/app/(protected)/(posts)/posts.consts"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { PostsFloatingQuickActions } from "@/app/(protected)/(posts)/components/PostsFloatingQuickActions"
import { ReactNode } from "react"
import { SettingKey } from "./(modules)/settings/lib/settings.interface"
import { settingsService } from "./(modules)/settings/lib/settings.service"

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
