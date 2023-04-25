import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../managers/TagsManager";

export const TagForm = ({ refreshPage }) => {
  const navigate = useNavigate();
  const initialState = {
    label: "",
  };
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTag(formInput)
      .then(() => {
        refreshPage();
      })
      .then(() => {
        setFormInput(initialState);
        navigate("/tags");
      });
  };

  return (
    <form className="tagForm" onSubmit={handleSubmit}>
      <fieldset>
        <h2>New Tag</h2>
        <input
          type="text"
          placeholder="Tag label"
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
