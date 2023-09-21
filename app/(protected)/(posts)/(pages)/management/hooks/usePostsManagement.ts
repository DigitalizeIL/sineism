import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDeletePostQuery } from "@/app/(protected)/(posts)/(pages)/management/queries/DeletePost"

export const usePostsManagement = () => {
    const queryClient = useQueryClient()

    const { mutate: deletePost } = useMutation({
        mutationFn: createDeletePostQuery(queryClient),
    })

    return {
        deletePost,
    }
}
