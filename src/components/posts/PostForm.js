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
    category_id: 0,
    title: "",
    publication_date: "",
    content: "",
    // Image is hard coded for now. Can be changed later. Not needed for CRUD.
    image_url: "https://images.squarespace-cdn.com/content/v1/5994d06915d5db843587ce50/1552451693608-VNZZIB2N5ZZYSJFB14E7/post.jpg"
  };

  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { post_id } = useParams();

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    getAllTags().then((data) => setTags(data));
    if (post_id) {
      getSinglePost(post_id).then((postObj) => {
        setFormInput((prevState) => ({
          // spreads into the obj to set the category. Is there a cleaner way?
          ...prevState,
          id: postObj.id,
          category_id: postObj.category?.id,
          title: postObj.title,
          publication_date: postObj.publication_date,
          content: postObj.content,
          image_url: postObj.image_url
        }));
        let editPostTags = [];
        postObj.tag?.map((t) => editPostTags.push(t.id));
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
      let newPost = {
        ...formInput,
        category_id: parseInt(formInput.category_id),
        tag: selectedTags,
      };
      updatePost(newPost).then(() => navigate(`/posts/${post_id}`));
    } else {
      let newPost = {
        ...formInput,
        category_id: parseInt(formInput.category_id),
        publication_date: new Date().toISOString().split('T')[0],
        tag: selectedTags,
      };
      console.log(newPost);
      createPost(newPost).then((newPost) => navigate(`/posts/${newPost.id}`));
    }
  };

  const handleCheckboxChange = (event) => {
    const copy = [...selectedTags];

    if (copy.includes(parseInt(event.target.id))) {
      const newCopy = copy.filter((obj) => obj !== parseInt(event.target.id))
      setSelectedTags(newCopy)
    } else {
      copy.push(parseInt(event.target.id));
      setSelectedTags(copy);
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
          // Check if the tag is already selected by looking for its ID in the selectedTags array
          const isChecked = selectedTags.includes(tag.id);

          // Create an object with the checkbox props, including the "checked" attribute based on the isChecked variable
          const checkboxProps = {
            type: "checkbox",
            id: tag.id,
            label: tag.label,
            checked: isChecked,
            onChange: handleCheckboxChange,
          };

          // Render the label and input elements, passing the checkbox props object to the input element using the spread operator
          return (
            <div key={tag.id}>
              <label htmlFor={tag.id}>{tag.label}</label>
              <input {...checkboxProps} />
            </div>
          );
        })}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
