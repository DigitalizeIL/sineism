"use client"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import { useRef, useState } from "react"
import { Select } from "@/components/Form/Select"
import { FormSubmitHandler } from "@/components/Form/types"
import { getMessageFromFormSubmitError } from "@/components/Form/errors"
import toast from "react-hot-toast"

type CommentFormProps = {
    createComment: FormSubmitHandler
    post?: IPost
    postOptions: { value: number; label: string }[]
    className?: string
}

export const CommentForm = (props: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [selectValue, setSelectValue] = useState<string>()

    const formAction = async (formData: FormData) => {
        const response = await props.createComment(formData)
        if (response.error) {
            toast.error(getMessageFromFormSubmitError(response.error))
            return
        }
        formRef.current?.reset()
        setSelectValue("")
    }

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <form
                ref={formRef}
                action={formAction}>
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
                        name={"postId"}
                        value={selectValue}
                        onChange={(value) => setSelectValue(value.toString())}
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
