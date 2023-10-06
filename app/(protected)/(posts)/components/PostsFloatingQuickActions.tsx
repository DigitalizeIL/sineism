"use client"

import { FloatingQuickActions } from "@/components/FloatingQuickActions"
import { useUserRole } from "@/app/(authentication)/context/UserContext"
import { ReactNode } from "react"

export const PostsFloatingQuickActions = (props: { children: ReactNode }) => {
    const { isAdmin } = useUserRole()

    if (!isAdmin) return null

    return <FloatingQuickActions>{props.children}</FloatingQuickActions>
}
