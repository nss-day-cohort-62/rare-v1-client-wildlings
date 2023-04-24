export const Posts = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.category.label}</h2>
      <h3>{post.user.first_name} {post.user.last_name}</h3>
    </div>
  );
};
