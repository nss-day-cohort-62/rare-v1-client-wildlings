import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../managers/PostsManager";
import { HumanDate } from "../utils/HumanDate";

export const Post = () => {
  const [post, setPost] = useState({});
  const { post_id } = useParams();

  useEffect(() => {
    getSinglePost(post_id).then((data) => setPost(data));
  }, [post_id]);

  return (
    <>
      <h1>{post.title}</h1>
      <div>
        {/* {post?.user?.first_name} {post?.user?.last_name} */}
        {post.author?.full_name}
      </div>
      <div>{post?.category?.label}</div>
      <div>{post.publication_date}</div>
      <div>{post.content}</div>
      <div>{
      post?.tags?.map((tag) => {
        return tag.label
      })}</div>
    </>
  );
};
