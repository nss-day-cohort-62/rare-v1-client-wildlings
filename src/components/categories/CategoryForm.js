import { useNavigate } from "react-router-dom";
import { createCategory } from "../../managers/CategoriesManager";
import { useState } from "react";

export const CategoryForm = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    label: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory(formInput).then(() => {
      navigate("/categories");
    });
  };

  return (
    <form className="categoryForm" onSubmit={handleSubmit}>
      <fieldset>
        <h2>New Category</h2>
        <input
          type="text"
          placeholder="Category label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        ></input>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};
