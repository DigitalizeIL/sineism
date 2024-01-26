export type BookmarkIdentifiers = {
    userId: number
    referenceId: number
    referenceType: "post" | "comment"
    extraId?: number
}

export type IBookmark = BookmarkIdentifiers & {
    id: number
    page: number
}

export type CreateBookmark = BookmarkIdentifiers & Pick<IBookmark, "page">
