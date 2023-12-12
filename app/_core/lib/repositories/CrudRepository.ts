import "server-only"

export interface CrudRepository<T> {
    getAll(): Promise<T[]>

    get(id: number): Promise<T | null>

    create(item: Partial<T>): Promise<T>

    update(id: number, item: Partial<T>): Promise<T>

    deleteItem(id: number): Promise<void>
}
