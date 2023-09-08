import "server-only"
import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"

export class Category implements ICategory {
    constructor(
        public id: number,
        public name: string
    ) {}

    public static fromJson(json: ICategory): Category {
        const { id, name } = json
        if (!id) throw new Error("Comment must have an id")
        return new Category(id, name)
    }

    public toJson(): any {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
