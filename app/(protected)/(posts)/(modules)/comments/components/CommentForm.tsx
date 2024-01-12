"use client"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import { Select } from "@/components/Form/Select"
import { Form, FormSubmitHandler, useForm } from "react-hook-form"
import { ControllerPlus } from "@/components/Form/Controller/Transformer"
import { Input } from "@/components/Form/Input"

type CommentFormProps = {
    createComment: (formData: CommentFormDto) => Promise<string | void>
    post?: IPost
    postOptions: { value: number; label: string }[]
    className?: string
}

export type CommentFormDto = {
    content: string
    postId: number
}

export const CommentForm = (props: CommentFormProps) => {
    const {
        control,
        formState: { errors },
    } = useForm<CommentFormDto>({
        mode: "onChange",
    })

    const onSubmit: FormSubmitHandler<CommentFormDto> = async (response) => {
        await props.createComment(response.data)
    }

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <Form
                control={control}
                onSubmit={onSubmit}>
                <TextArea
                    control={control}
                    name={"content"}
                    rules={{
                        required: true,
                    }}
                    className="w-full"
                    placeholder={"לתגובה על פוסט/ים"}
                />
                <ControllerPlus
                    control={control}
                    transform={{
                        output: (value) => {
                            return parseInt(value.target.value)
                        },
                    }}
                    name={"postId"}
                    type={"number"}
                    hidden={!!props.post}
                    Component={props.post ? Input : Select}
                    options={props.postOptions}
                />
                <Button
                    submit
                    type="ghost"
                    className={"text-3xl text-black"}>
                    יצירת תגובה
                </Button>
            </Form>
        </div>
    )
}
