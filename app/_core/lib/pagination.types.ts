export type DBPagination = {
    take: number
    skip?: number
    cursor?: number
}

export type Pagination = {
    perPage: number
    page?: number
    id?: number
}
