"use client"

import { Modal } from "@/components/Modal"
import { Button } from "@/components/Button"
import { BiComment } from "react-icons/bi"
import { ReactNode, useState } from "react"

export const CommentsModal = ({ children }: { children: ReactNode }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

    return (
        <div>
            <Modal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}>
                {children}
            </Modal>
            <Button
                type={"ghost"}
                onClick={() => setIsCommentModalOpen(true)}>
                <BiComment />
            </Button>
        </div>
    )
}
