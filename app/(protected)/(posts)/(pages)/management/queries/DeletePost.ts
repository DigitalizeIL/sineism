import axios from "axios"
import { QueryClient } from "@tanstack/react-query"

export const createDeletePostQuery =
    (queryClient: QueryClient) => async (postId: number) => {
        await axios.delete(`/posts/${postId}`)

        await queryClient.invalidateQueries({ queryKey: [`posts`] })
    }
