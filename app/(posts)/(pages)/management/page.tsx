import { PostsFeed } from "app/(posts)/components/PostsFeed"
import { ModalWithButton } from "@/components/Modal"
import { PostCreateOrEditForm } from "@/app/(posts)/components/PostCreateOrEditForm"
import { CreateCategoryForm } from "@/app/(posts)/(modules)/categories/components/CreateCategoryForm"
import React from "react"

export default function PostsPage() {
    return (
        <div className="flex h-screen">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-start items-center">
                <h2 className="text-4xl font-bold">Admin Only Page</h2>
                <div className="flex justify-center mt-4">
                    <ModalWithButton buttonText={"Create Post"}>
                        <PostCreateOrEditForm />
                    </ModalWithButton>
                    <ModalWithButton buttonText={"Create Category"}>
                        <CreateCategoryForm />
                    </ModalWithButton>
                </div>
                <h3 className="text-2xl font-bold">All Posts</h3>
                <PostsFeed />
            </div>
        </div>
    )
}
