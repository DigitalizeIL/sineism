"use client"

import { AiOutlineDelete } from "react-icons/ai"
import { Button } from "@/components/Button"
import { deletePost } from "../actions/deletePost.action"

export const DeletePostButton = (props: { postId: number }) => {
    return (
        <form action={deletePost.bind(null, props)}>
            <Button
                type="ghost"
                className={"text-3xl text-black"}>
                <AiOutlineDelete />
            </Button>
        </form>
    )
}
