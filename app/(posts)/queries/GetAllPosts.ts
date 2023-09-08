import axios from "axios"

export const getAllPosts = async () => {
    const request = await axios.get(`/posts`)

    return request.data
}
