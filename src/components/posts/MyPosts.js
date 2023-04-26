import { useEffect, useState } from "react";
import { getMyPosts } from "../../managers/PostsManager";
import { Posts } from "./Posts";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const userId = JSON.parse(localStorage.getItem("auth_token"));

  useEffect(() => {
    getMyPosts(userId).then((data) => setMyPosts(data));
  }, []);

  return (
    <>
      {myPosts.map((post) => {
        return (
          <>
            <Posts key={post.id} post={post} />
            <button>Edit</button>
            <button>Delete</button>
          </>
        );
      })}
    </>
  );
};
