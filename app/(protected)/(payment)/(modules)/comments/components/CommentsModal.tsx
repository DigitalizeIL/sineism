"use client"

import {
    CommentForm,
    CommentFormProps,
} from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"
import { Modal, ModalWithButton } from "@/components/Modal"
import { ReactNode, useState } from "react"

import { BiComment } from "react-icons/bi"
import { Button } from "@/components/Button"
import { EMPTY_COMMENT_ID } from "@/app/(protected)/(posts)/(modules)/comments/comments.consts"

export const CommentsModal = ({
    createComment,
    postOptions,
    post,
}: CommentFormProps) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

    const onSubmit = async (formData: FormData) => {
        createComment(formData)
        setIsCommentModalOpen(false)
    }

    return (
        <ModalWithButton
            onClose={() => setIsCommentModalOpen(false)}
            onOpen={() => setIsCommentModalOpen(true)}
            buttonText={<BiComment />}
            isOpen={isCommentModalOpen}>
            <CommentForm
                post={post}
                createComment={onSubmit}
                postOptions={postOptions}
            />
        </ModalWithButton>
    )
}
