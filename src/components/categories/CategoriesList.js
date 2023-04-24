import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoriesManager";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, [])

  return (
    categories.map((category) => (
      <>
        <h1 key={category.id}>{category.label}</h1>
        <button>Edit</button>
        <button>Delete</button>
      </>
    ))
  );

}
