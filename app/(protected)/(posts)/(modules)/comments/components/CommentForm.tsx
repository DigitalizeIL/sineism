"use client"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import { useRef, useState } from "react"
import { Select } from "@/components/Form/Select"

type CommentFormProps = {
    createComment: (formData: FormData) => Promise<void>
    post?: IPost
    postOptions: { value: number; label: string }[]
    className?: string
}

export const CommentForm = (props: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [selectValue, setSelectValue] = useState<string>()

    const action = async (formData: FormData) => {
        await props.createComment(formData)
        formRef.current?.reset()
        setSelectValue("")
    }

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <form
                ref={formRef}
                action={action}
                className={"flex flex-col gap-2"}>
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
                    <Select
                        value={selectValue}
                        onChange={(id) => setSelectValue(id.toString())}
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
