"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Form/Input/Input"
import { TextArea } from "@/components/Form/TextArea"
import {
    CreatePostDto,
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Select } from "@/components/Form/Select"
import { ModalWithButton } from "@/components/Modal"
import React, { FormEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { AiOutlineEdit } from "react-icons/ai"

export const PostCreateOrEditForm = (props: {
    post?: IPost
    categories: ICategory[]
    createPost: (post: CreatePostDto) => Promise<void>
    editPost: (postId: number, post: EditPostDto) => Promise<void>
}) => {
    const { data } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const confirm = async (e: FormEvent) => {
        const formData = new FormData(e.target as HTMLFormElement)
        e.preventDefault()

        try {
            setIsLoading(true)

            if (props.post?.id) {
                await props.editPost(props.post.id, {
                    title: formData.get("title") as string,
                    content: formData.get("content") as string,
                    categoryId: Number(formData.get("category") as string),
                })
            } else if (data?.user?.id) {
                await props.createPost({
                    title: formData.get("title") as string,
                    content: formData.get("content") as string,
                    categoryId: Number(formData.get("category") as string),
                    authorId: data?.user?.id,
                })
            } else {
                throw new Error("User not logged in")
            }

            setIsOpen(false)
            return false
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <ModalWithButton
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            buttonText={props.post ? <AiOutlineEdit /> : "Create Post"}
            isOpen={isOpen}>
            <form onSubmit={confirm}>
                <div className="flex flex-col space-y-2 p-3">
                    <Input
                        placeholder={"Title"}
                        defaultValue={props.post?.title}
                        type="text"
                        name={"title"}
                    />
                    <TextArea
                        placeholder={"Content"}
                        defaultValue={props.post?.content}
                        name={"content"}
                        rows={5}
                    />
                    <Select
                        name={"category"}
                        options={
                            props.categories?.map((category: ICategory) => ({
                                label: category.name,
                                value: category.id,
                            })) || []
                        }
                    />
                    <hr />
                    <Button
                        loading={isLoading}
                        type="ghost"
                        className={"text-3xl text-black"}>
                        {props.post?.id ? "Edit" : "Create"}
                    </Button>
                </div>
            </form>
        </ModalWithButton>
    )
}
