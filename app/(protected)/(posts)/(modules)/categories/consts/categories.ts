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

export const CATEGORIES: CategoryData[] = [UTTERANCES_CATEGORY]
