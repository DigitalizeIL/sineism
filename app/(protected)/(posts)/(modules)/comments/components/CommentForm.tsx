"use client"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import { useRef } from "react"
import { UnControlledSelect } from "@/components/Form/Select/UnControlledSelect"

type CommentFormProps = {
    createComment: (formData: FormData) => void
    post?: IPost
    postOptions: { value: number; label: string }[]
    className?: string
}

export const CommentForm = (props: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <form
                ref={formRef}
                action={async (formData) => {
                    await props.createComment(formData)
                    formRef.current?.reset()
                }}>
                <TextArea
                    name="content"
                    className="w-full"
                    placeholder={"לתגובה על פוסט/ים"}
                />
                {props.post ? (
                    <input
                        type={"hidden"}
                        name={"postId"}
                        value={props.post.id}
                    />
                ) : (
                    <UnControlledSelect
                        name={"postId"}
                        options={props.postOptions}
                    />
                )}
                <Button
                    type="ghost"
                    className={"text-3xl text-black"}>
                    יצירת תגובה
                </Button>
            </form>
        </div>
    )
}
