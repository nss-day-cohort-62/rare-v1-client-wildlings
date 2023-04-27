import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../managers/CategoriesManager";
import {
  createPost,
  getSinglePost,
  updatePost,
} from "../../managers/PostsManager";
import { getAllTags } from "../../managers/TagsManager";

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
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [postId, setPostId] = useState(0);
  const { post_id } = useParams();

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    getAllTags().then((data) => setTags(data));
    if (post_id) {
      getSinglePost(post_id).then((postObj) => {
        setFormInput(postObj);
        let editPostTags = [];
        postObj.tag.map((t) => {
          editPostTags.push(t.id);
        });
        setSelectedTags(editPostTags);
      });
    }
  }, [post_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post_id) {
      updatePost(formInput).then(() => navigate(`/posts/${post_id}`));
    } else {
      let newPost = {
        ...formInput,
        category_id: parseInt(formInput.category_id),
        user_id: parseInt(userObj),
        publication_date: new Date(),
        tag: selectedTags,
      };
      console.log(newPost);
      createPost(newPost).then((newPost) => navigate(`/posts/${newPost.id}`));
    }
  };

  const handleCheckboxChange = (event) => {
    event.preventDefault();
    const copy = [...selectedTags];

    if (copy.includes(event.target.id)) {
      const newCopy = copy.filter((obj) => obj !== parseInt(event.target.id))
      setSelectedTags(newCopy)
    } else {
      copy.push(parseInt(event.target.id));
      setSelectedTags(copy);
    }
  };

  const handleChecks = (checkboxId) => {
    if (selectedTags.includes(checkboxId)) {
      return "checked";
    } else {
      return "";
    }
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
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </fieldset>
      <div>
        {tags.map((tag) => {
          return (
            <>
              <label htmlFor="type">{tag.label}</label>
              <input
                type="checkbox"
                {handleChecks(tag.id)}
                label={tag.label}
                id={tag.id}
                onChange={handleCheckboxChange}
              />
            </>
          );
        })}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
