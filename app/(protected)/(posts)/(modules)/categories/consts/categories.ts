export type CategoryData = {
    id: number
    name: string
    label: string
    path: string
}

export const UTTERANCES_CATEGORY: CategoryData = {
    id: 1,
    name: "Utterances",
    label: "אמרות",
    path: "/categories/utterances",
}

export const EDITED_UTTERANCES_CATEGORY: CategoryData = {
    id: 2,
    name: "EditedUtterances",
    label: "אמרות ערוכות",
    path: "/categories/edited-utterances",
}

export const CATEGORIES: CategoryData[] = [
    UTTERANCES_CATEGORY,
    EDITED_UTTERANCES_CATEGORY,
]
