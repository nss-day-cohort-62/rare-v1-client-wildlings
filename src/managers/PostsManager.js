export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts')
        .then(res => res.json())
}

export const getSinglePost = (post_id) => {
    return fetch(`http://localhost:8088/posts/${post_id}`)
        .then(res => res.json())
}