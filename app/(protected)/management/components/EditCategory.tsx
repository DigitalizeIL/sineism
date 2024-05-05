"use client"

import { Button } from "@/app/_core/components/Button"
import { ICategory } from "../../(posts)/(modules)/categories/lib/category.interface"
import { Input } from "@/app/_core/components/Form/Input"
import { Label } from "@/app/_core/components/Form/Label"
import { useState } from "react"

type EditCategoryProps = {
    editCategory: (formData: FormData) => Promise<void>
    category: ICategory
}
export const EditCategory = async ({
    editCategory,
    category,
}: EditCategoryProps) => {
    const [editedCategory, setEditedCategory] = useState(category)

    return (
        <div
            dir="ltr"
            className="flex flex-col items-center justify-center">
            <h3 className="text-xl">Edit Category</h3>

            <form
                action={editCategory}
                className="mt-4">
                <input
                    type="hidden"
                    name="categoryId"
                    value={editedCategory.id}
                />
                <Label text="Categotry Name">
                    <Input
                        name="name"
                        value={editedCategory.name}
                        type="text"
                        onChange={(name) =>
                            setEditedCategory((category) => ({
                                ...category,
                                name,
                            }))
                        }
                    />
                </Label>
                <Label text="Categotry Slug">
                    <Input
                        name="path"
                        value={editedCategory.path}
                        type="text"
                        onChange={(path) =>
                            setEditedCategory((category) => ({
                                ...category,
                                path,
                            }))
                        }
                    />
                </Label>
                <Button fullWidth>Save</Button>
            </form>
        </div>
    )
}
