import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePost } from "../../managers/PostsManager"

export const Post = () => {
    const [post, setPost] = useState({})
    const {post_id} = useParams()

    useEffect(() => {
        getSinglePost(post_id)
        .then((data) => setPost(data))
    },[])

    return <>
        <h1>{post.title}</h1>
        <div>{post?.user?.first_name} {post?.user?.last_name}</div>
        <div>{post?.category?.label}</div>
        <div>{post.publication_date}</div>
        <div>{post.content}</div>
    </>
}