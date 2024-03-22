"use client"

import { FC, useMemo, useRef, useState } from "react"
import { Option, Select } from "@/components/Form/Select"
import Select2, { MultiValue } from "react-select"

import { Button } from "@/components/Button"
import { EMPTY_COMMENT_ID } from "../comments.consts"
import { ICategory } from "../../categories/lib/category.interface"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { Label } from "@/app/_core/components/Form/Label"
import { TEXTS } from "../comments.texts"
import { TextArea } from "@/components/Form/TextArea"
import clsx from "clsx"
import toast from "react-hot-toast"

export type CommentFormProps = {
    createComment: (formData: FormData) => Promise<void>
    post?: IPost
    posts: IPost[]
    className?: string
    categories: ICategory[]
}

export const CommentForm: FC<CommentFormProps> = ({
    post,
    posts,
    className,
    categories,
    createComment,
}) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [selectValue, setSelectValue] = useState<MultiValue<Option>>([])
    const [selectedCategortyId, setSelectedCategory] = useState<number>()
    const [loading, setLoading] = useState(false)
    const [categoryKey, setCategoryKey] = useState(Math.random())
    const action = async (formData: FormData) => {
        try {
            const content = formData.get("content") as string

            if (!selectValue.length || !content) {
                toast.error("Content and posts are required")
                return
            }

            const postIds = selectValue.map((option) => option.value).join("|")
            formData.set("postIds", postIds)

            await createComment(formData)

            formRef.current?.reset()
            setSelectedCategory(undefined)
            setCategoryKey(Math.random())
            setSelectValue([])
        } catch (e) {
            console.error(e)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
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

    const postOptions = useMemo(() => {
        return [
            {
                value: EMPTY_COMMENT_ID,
                label: "#",
            },
            ...posts
                .filter((post) => post.categoryId === selectedCategortyId)
                .map((post) => ({
                    value: post.id,
                    label: post.postNumber.toString(),
                })),
        ]
    }, [posts, selectedCategortyId])

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", className])}>
            <form
                ref={formRef}
                action={action}
                onSubmit={() => {
                    setLoading(true)
                }}
                className={"flex flex-col gap-2"}>
                <Label text={TEXTS.whichCategory}>
                    <Select
                        key={categoryKey}
                        onChange={(id) => {
                            setSelectedCategory(Number(id))
                        }}
                        placeholder={TEXTS.category}
                        name="category"
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </Label>
                {post ? (
                    <input
                        type={"hidden"}
                        name={"postIds"}
                        value={post.id}
                    />
                ) : (
                    <Label text={TEXTS.postsSelectionLabel}>
                        <Select2
                            isDisabled={!selectedCategortyId}
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
                            options={postOptions as any}
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
                <Label text={TEXTS.commentContentLabel}>
                    <TextArea
                        name="content"
                        className="w-full"
                        placeholder={TEXTS.commentContent}
                    />
                </Label>
                <Button
                    loading={loading}
                    type="ghost"
                    className={"text-3xl text-black"}>
                    {TEXTS.submit}
                </Button>
            </form>
        </div>
    )
}
