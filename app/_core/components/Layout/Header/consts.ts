type Link = {
    href: string
    label: string
}

export const COMMENTS_LINK: Link = {
    href: "/comments",
    label: "תגובות",
}

export const LINKS: Link[] = [
    {
        href: "/categories",
        label: "בית",
    },
    COMMENTS_LINK,
]
