"use client"

import {
    CommentForm,
    CommentFormProps,
} from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"
import { FC, useState } from "react"

import { BiComment } from "react-icons/bi"
import { ModalWithButton } from "@/components/Modal"

export const CommentsModal: FC<CommentFormProps> = ({
    createComment,
    posts,
    post,
    categories,
}) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

    const onSubmit = async (formData: FormData) => {
        const response = createComment(formData)
        setIsCommentModalOpen(false)

        return response;
    }

    return (
        <ModalWithButton
            onClose={() => setIsCommentModalOpen(false)}
            onOpen={() => setIsCommentModalOpen(true)}
            buttonText={<BiComment />}
            isOpen={isCommentModalOpen}>
            <CommentForm
                categories={categories}
                post={post}
                createComment={onSubmit}
                posts={posts}
            />
        </ModalWithButton>
    )
}
