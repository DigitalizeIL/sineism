import { Metadata } from "next"
import React, { ReactNode } from "react"
import { METADATA } from "@/app/(protected)/(posts)/consts"
import { Header } from "@/components/Layout"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"
import { PostsFloatingQuickActions } from "@/app/(protected)/(posts)/components/PostsFloatingQuickActions"
import { CreateCategoryForm } from "@/app/(protected)/(posts)/(modules)/categories/components/CreateCategoryForm"
import { ModalWithButton } from "@/components/Modal"
import { PostCreateOrEditForm } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm"

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

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
            <PostsFloatingQuickActions>
                <ModalWithButton buttonText={"Create Post"}>
                    <PostCreateOrEditForm />
                </ModalWithButton>
                <ModalWithButton buttonText={"Create Category"}>
                    <CreateCategoryForm />
                </ModalWithButton>
            </PostsFloatingQuickActions>
        </>
    )
}