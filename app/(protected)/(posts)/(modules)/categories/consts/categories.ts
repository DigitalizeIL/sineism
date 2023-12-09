import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"

export type CategoryData = Omit<ICategory, "posts"> & {
    path: string
}

export const UTTERANCES_CATEGORY: CategoryData = {
    id: 1,
    name: "אמרות",
    path: "/categories/utterances",
}

export const EDITED_UTTERANCES_CATEGORY: CategoryData = {
    id: 2,
    name: "אמרות ערוכות",
    path: "/categories/edited-utterances",
}

export const CATEGORIES: CategoryData[] = [
    EDITED_UTTERANCES_CATEGORY,
    UTTERANCES_CATEGORY,
]
