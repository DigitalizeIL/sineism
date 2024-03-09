import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"

export const UTTERANCES_CATEGORY: ICategory = {
    id: 1,
    name: "אמרות",
    path: "utterances",
}

export const EDITED_UTTERANCES_CATEGORY: ICategory = {
    id: 2,
    name: "אמרות ערוכות",
    path: "edited-utterances",
}

export const CATEGORIES: ICategory[] = [
    UTTERANCES_CATEGORY,
    EDITED_UTTERANCES_CATEGORY,
]
