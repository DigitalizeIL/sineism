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

    const [title, setTitle] = useState(props.post?.title)
    const [content, setContent] = useState(props.post?.content)
    const [category, setCategory] = useState(props.post?.categoryId)

    const confirm = async (e: FormEvent) => {
        e.preventDefault()

        try {
            if (!(title && content && category)) {
                throw new Error("title, content, and category are required")
            }

            setIsLoading(true)

            if (props.post?.id) {
                await props.editPost(props.post.id, {
                    title,
                    content,
                    categoryId: category,
                })
            } else if (data?.user?.id) {
                await props.createPost({
                    title,
                    content,
                    categoryId: category,
                    authorId: data?.user?.id,
                })
            } else {
                throw new Error("User not logged in")
            }

            setTitle("")
            setContent("")
            setCategory(undefined)

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
                        type="text"
                        name={"title"}
                        value={title}
                        onChange={(value) => setTitle(value)}
                    />
                    <TextArea
                        placeholder={"Content"}
                        name={"content"}
                        value={content}
                        onChange={(value) => setContent(value)}
                        rows={10}
                    />
                    <Select
                        name={"category"}
                        value={category}
                        onChange={(value) => setCategory(Number(value))}
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
