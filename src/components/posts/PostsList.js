import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostsManager";
import { Posts } from "./Posts";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return <>
  {
    posts.map(
        (post) => {
            <Posts key={post.id} post={post}/>        
        }
    )
  }
  </>

};
