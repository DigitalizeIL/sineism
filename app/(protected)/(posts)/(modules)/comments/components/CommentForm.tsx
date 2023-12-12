"use client"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import { useRef, useState } from "react"
import { UnControlledSelect } from "@/components/Form/Select/UnControlledSelect"
import { FormErrors, FormResponse } from "@/components/Form/types"
import { ErrorList } from "@/components/ErrorList"

type CommentFormProps = {
    createComment: (formData: FormData) => Promise<FormResponse>
    post?: IPost
    postOptions: { value: number; label: string }[]
    className?: string
}

export const CommentForm = (props: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<FormErrors>()

    const formAction = async (formData: FormData) => {
        const response = await props.createComment(formData)
        setErrors(response.errors)

        if (response.success) {
            formRef.current?.reset()
        }
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
                    <UnControlledSelect
                        defaultValue={""}
                        placeholder={"בחירת פוסט"}
                        name={"postId"}
                        options={props.postOptions}
                    />
                )}
                <Button
                    type="ghost"
                    className={"text-3xl text-black"}>
                    יצירת תגובה
                </Button>
                <ErrorList errors={errors} />
            </form>
        </div>
    )
}
