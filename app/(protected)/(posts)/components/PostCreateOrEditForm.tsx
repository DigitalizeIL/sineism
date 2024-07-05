"use client"

import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { FC, useState } from "react"

import { useContent } from "@/app/_core/views/ContentFeed"
import { Button } from "@/components/Button"
import { Input } from "@/components/Form/Input/Input"
import { Select } from "@/components/Form/Select"
import { TextArea } from "@/components/Form/TextArea"
import { ModalWithButton } from "@/components/Modal"
import { AiOutlineEdit } from "react-icons/ai"
import { createPost } from "../actions/post.action"
import { TEXTS } from "../posts.texts"

type FormProps = {
    post?: IPost
    className?: string
}

export const PostCreateOrEditForm: FC<FormProps> = ({ post, className }) => {
    const [isOpen, setIsOpen] = useState(false)

    const { categories } = useContent()

    const categoryOption =
        (categories?.map((category) => ({
            label: category.name,
            value: category.id,
        })) as any) || []

    return (
        <ModalWithButton
            className={className}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            buttonText={post ? <AiOutlineEdit /> : "Create Post"}
            isOpen={isOpen}>
            <form action={createPost}>
                <div className="flex flex-col space-y-2 p-3">
                    <div className={"flex flex-row gap-2"}>
                        {post?.postNumber !== undefined && (
                            <Input
                                placeholder={"Number"}
                                type="number"
                                name={"postNumber"}
                                className={"flex-5"}
                                defaultValue={post?.postNumber}
                            />
                        )}
                        <Input
                            defaultValue={post?.title}
                            placeholder={"Title"}
                            type="text"
                            name={"title"}
                        />
                    </div>
                    <TextArea
                        defaultValue={post?.content}
                        placeholder={"Content"}
                        name={"content"}
                        rows={10}
                    />
                    <Select
                        defaultValue={post?.categoryId}
                        name={"category"}
                        options={categoryOption}
                    />
                    <hr />
                    <Button
                        type="ghost"
                        className={"text-3xl text-black"}>
                        {post?.id ? TEXTS.save : TEXTS.create}
                    </Button>
                    <input
                        type="hidden"
                        value={post?.id}
                        name="id"
                    />
                </div>
            </form>
        </ModalWithButton>
    )
}
