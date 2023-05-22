import { Link } from "react-router-dom";

export const Posts = ({ post }) => {
  return (
    <div>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      {/* <h2>{post.category.label}</h2>
      <h3>{post.user.first_name} {post.user.last_name}</h3> */}
    </div>
  );
};
