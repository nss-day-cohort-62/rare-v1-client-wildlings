export const Posts = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.content}</h2>
      <h3>{post.date}</h3>
    </div>
  );
};
