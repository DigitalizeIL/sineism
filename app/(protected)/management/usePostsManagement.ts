import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createDeletePostQuery } from "@/app/(protected)/management/posts.query"

export const usePostsManagement = () => {
    const queryClient = useQueryClient()

    const { mutate: deletePost } = useMutation({
        mutationFn: createDeletePostQuery(queryClient),
    })

    return {
        deletePost,
    }
}
