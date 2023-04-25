import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/CategoriesManager";
import { createPost } from "../../managers/PostsManager";

export const PostForm = () => {
  const navigate = useNavigate();
  const initialState = {
    user_id: 0,
    category_id: 0,
    title: "",
    publication_date: "",
    content: "",
  };

  const userObj = JSON.parse(localStorage.getItem("auth_token"));
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newPost = {
      ...formInput,
      category_id: parseInt(formInput.category_id),
      user_id: parseInt(userObj),
      publication_date: new Date(),
    };

    createPost(newPost).then((newPost) => navigate(`/posts/${newPost.id}`));
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <fieldset>
        <input
          type="text"
          placeholder="post title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <input
          type="textarea"
          rows="4"
          cols="50"
          placeholder="post content"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <select
          name="category_id"
          value={formInput.category_id}
          onChange={handleChange}
        >
          <option value="0">Select a Category</option>
          {categories.map((category) => (
            <option value={category.id}>{category.label}</option>
          ))}
        </select>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};
