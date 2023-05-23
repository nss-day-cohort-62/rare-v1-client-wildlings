import { useEffect, useState } from "react";
import { getMyPosts, deletePost } from "../../managers/PostsManager";
import { Posts } from "./Posts";
import { useNavigate } from "react-router-dom";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  

  const getAllMyPosts = () => {
    getMyPosts().then((data) => setMyPosts(data));
  }

  useEffect(() => {
    getAllMyPosts();
  }, []);

  const deleteDat = (postId) => {
    deletePost(postId).then(() => {
      getAllMyPosts();
    })
  }
  return (
    <>
      {myPosts.map((post) => {
        return (
          <div key={post.id}>
            <Posts key={post.id} post={post} />
            <button key={`edit--${post.id}`} type="button" onClick={() => { navigate(`/edit_post/${post.id}`) }}>Edit</button>
            <button key={`delete--${post.id}`} type="button" onClick={() => { deleteDat(post.id) }}>Delete</button>
          </div>
        );
      })}
    </>
  );
};
