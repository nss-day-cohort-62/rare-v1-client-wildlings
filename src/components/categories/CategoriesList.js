import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoriesManager";
import Categories from "./Categories";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, [])

  return (
    categories.map((category) => <Categories key={category.id} category={category} />)
  );

}
