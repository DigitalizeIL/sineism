export type BookmarkIdentifiers = {
    userId: number
    referenceType: "comment" | string
}

export type IBookmark = BookmarkIdentifiers & {
    id: number
    page: number
    bookmarkedItemId: string
}

export type CreateBookmark = Omit<IBookmark, "id">
