type Link = {
    href: string
    label?: string
    icon?: "house"
}

export const COMMENTS_LINK = {
    href: "/comments",
    label: "תגובות",
}

export const LINKS: Link[] = [
    {
        href: "/categories",
        icon: "house",
    },
    COMMENTS_LINK,
]
