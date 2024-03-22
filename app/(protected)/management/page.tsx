import { CreateCategoryForm } from "@/app/(protected)/(posts)/(modules)/categories/components/CreateCategoryForm"
import { ModalWithButton } from "@/components/Modal"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { PostsFeed } from "@/app/(protected)/(posts)/components/PostsFeed"
import React from "react"
import { Settings } from "@/app/(protected)/(posts)/(modules)/settings/components/Settings"

export default function PostsPage() {
    return (
        <div className="flex h-screen">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-start items-center">
                <h2 className="text-4xl font-bold">Admin Only Page</h2>
                <div className="flex justify-center mt-4">
                    <PostCreateOrEditFormContainer />
                    <ModalWithButton buttonText={"Create Category"}>
                        <CreateCategoryForm />
                    </ModalWithButton>
                    <Settings />
                    
                </div>
                <h3 className="text-2xl font-bold">All Posts</h3>
                {/* <PostsFeed /> */}
            </div>
        </div>
    )
}
