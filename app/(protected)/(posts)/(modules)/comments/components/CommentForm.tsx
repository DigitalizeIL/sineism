"use client"

import Select2, { MultiValue } from "react-select"
import { useRef, useState } from "react"

import { Button } from "@/components/Button"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { Option } from "@/components/Form/Select"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import toast from "react-hot-toast"

type CommentFormProps = {
    createComment: (formData: FormData) => Promise<void>
    post?: IPost
    postOptions: Option[]
    className?: string
}

export const CommentForm = (props: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [selectValue, setSelectValue] = useState<MultiValue<Option>>([])

    const action = async (formData: FormData) => {
        const content = formData.get("content") as string

        if (!selectValue.length || !content) {
            toast.error("Content and posts are required")
            return
        }

        const postIds = selectValue.map((option) => option.value).join("|")
        formData.set("postIds", postIds)
        await props.createComment(formData)
        formRef.current?.reset()
        setSelectValue([])
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
                        name={"postIds"}
                        value={props.post.id}
                    />
                ) : (
                    <Select2
                        isMulti
                        isSearchable
                        value={selectValue}
                        onChange={(id) => setSelectValue(id)}
                        name={"postIds"}
                        options={props.postOptions as any}
                        styles={{
                            option: (base, props) => ({
                                ...base,
                                textAlign: "right",
                                // paddingInlineStart: "10px",
                            }),
                            placeholder: (base, props) => ({
                                ...base,
                                textAlign: "right",
                            }),
                        }}
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
