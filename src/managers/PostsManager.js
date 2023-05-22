const url = "http://localhost:8000";

export const getAllPosts = () => {
  return fetch(`${url}/posts`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const getSinglePost = (post_id) => {
  return fetch(`${url}/posts/${post_id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const getMyPosts = (userId) => {
  return fetch(`${url}/posts/?_user=${userId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const createPost = (newPost) => {
  return fetch(`http://localhost:8000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = (postObj) => {
  return fetch(`http://localhost:8000/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  });
};
