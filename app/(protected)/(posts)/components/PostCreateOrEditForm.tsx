"use client"

import {
    CreatePostDto,
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/post.interface"
import React, { FC, FormEvent, useEffect, useState } from "react"

import { AiOutlineEdit } from "react-icons/ai"
import { Button } from "@/components/Button"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { Input } from "@/components/Form/Input/Input"
import { ModalWithButton } from "@/components/Modal"
import { Select } from "@/components/Form/Select"
import { TEXTS } from "../posts.texts"
import { TextArea } from "@/components/Form/TextArea"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"

type FormProps = {
    post?: IPost
    categories: ICategory[]
    createPost: (post: CreatePostDto) => Promise<IPost>
    editPost: (postId: number, post: EditPostDto) => Promise<void>
}

export const PostCreateOrEditForm: FC<FormProps> = ({
    post,
    categories,
    createPost,
    editPost,
}) => {
    const { data } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [number, setNumber] = useState(post?.postNumber)
    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.content)
    const [category, setCategory] = useState(
        post?.categoryId || categories?.[0]?.id
    )

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content)
            setCategory(post.categoryId)
            setNumber(post.postNumber)
        }
    }, [post])

    const confirm = async (e: FormEvent) => {
        e.preventDefault()

        try {
            if (!(title && content && category)) {
                throw new Error("title, content, and category are required")
            }

            setIsLoading(true)

            if (post?.id) {
                await editPost(post.id, {
                    title,
                    content,
                    categoryId: category,
                    postNumber: number,
                })
            } else if (data?.user?.id) {
                await createPost({
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
            setNumber(undefined)

            toast.success("Your post is submitted")

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
            buttonText={post ? <AiOutlineEdit /> : "Create Post"}
            isOpen={isOpen}>
            <form onSubmit={confirm}>
                <div className="flex flex-col space-y-2 p-3">
                    <div className={"flex flex-row gap-2"}>
                        {number !== undefined && (
                            <Input
                                placeholder={"Number"}
                                type="number"
                                name={"title"}
                                value={number}
                                className={"flex-5"}
                                onChange={(value) => setNumber(value)}
                            />
                        )}
                        <Input
                            placeholder={"Title"}
                            type="text"
                            name={"title"}
                            value={title}
                            className={"flex-1"}
                            onChange={(value) => setTitle(value)}
                        />
                    </div>
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
                            (categories?.map((category) => ({
                                label: category.name,
                                value: category.id,
                            })) as any) || []
                        }
                    />
                    <hr />
                    <Button
                        loading={isLoading}
                        type="ghost"
                        className={"text-3xl text-black"}>
                        {post?.id ? TEXTS.save : TEXTS.create}
                    </Button>
                </div>
            </form>
        </ModalWithButton>
    )
}
