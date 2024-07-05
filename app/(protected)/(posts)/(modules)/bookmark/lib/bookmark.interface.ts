export type BookmarkReference = "comment" | string

export type BookmarkIdentifiers = {
    userId: number
    referenceType: BookmarkReference
}

export type IBookmark = BookmarkIdentifiers & {
    id: number
    bookmarkedItemId: number
}

export type CreateBookmark = Omit<IBookmark, "id">
