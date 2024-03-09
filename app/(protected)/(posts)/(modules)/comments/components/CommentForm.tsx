"use client"

import Select2, { MultiValue } from "react-select"
import { useMemo, useRef, useState } from "react"

import { Button } from "@/components/Button"
import { EMPTY_COMMENT_ID } from "../comments.consts"
import { FormControl } from "@mui/material"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { Label } from "@/app/_core/components/Form/Label"
import { Option } from "@/components/Form/Select"
import { TEXTS } from "../comments.texts"
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
    const [loading, setLoading] = useState(false)

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
        setLoading(false)
    }

    const isNoReference = useMemo(
        () =>
            !Array.isArray(selectValue) && "value" in selectValue
                ? selectValue.value === EMPTY_COMMENT_ID
                : selectValue?.some(
                      (value) => value.value === EMPTY_COMMENT_ID
                  ),
        [selectValue]
    )

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <form
                ref={formRef}
                action={action}
                onSubmit={() => {
                    setLoading(true)
                }}
                className={"flex flex-col gap-2"}>
                {props.post ? (
                    <input
                        type={"hidden"}
                        name={"postIds"}
                        value={props.post.id}
                    />
                ) : (
                    <Label
                        text={TEXTS.postsSelectionLabel}
                        className="text-right">
                        <Select2
                            placeholder={TEXTS.postsSelectionPlaceholder}
                            isMulti={!isNoReference}
                            isSearchable
                            value={
                                isNoReference
                                    ? ({
                                          label: TEXTS.allItems,
                                          value: { EMPTY_COMMENT_ID },
                                      } as any)
                                    : selectValue
                            }
                            onChange={(id) => {
                                if (!id) {
                                    setSelectValue([])
                                    return
                                }

                                setSelectValue("value" in id ? [id] : id)
                            }}
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
                    </Label>
                )}
                <TextArea
                    name="content"
                    className="w-full"
                    placeholder={"לתגובה על פוסט/ים"}
                />
                <Button
                    loading={loading}
                    type="ghost"
                    className={"text-3xl text-black"}>
                    יצירת תגובה
                </Button>
            </form>
        </div>
    )
}
