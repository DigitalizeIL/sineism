import { z } from "zod"

export const Comment = z.object({
    content: z.string().trim().min(1),
    postId: z.number(),
    userId: z.number(),
    id: z.number(),
})

export const CreateComment = Comment.omit({
    id: true,
})

export type IComment = z.infer<typeof Comment>

export type CreateCommentType = z.infer<typeof CreateComment>
