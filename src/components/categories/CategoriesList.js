import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoriesManager";
import { CategoryForm } from "./CategoryForm";
import Categories from "./Categories";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const getAllTheCategories = () => {
    getAllCategories().then((data) => {
      setCategories(data)
    });
  }
  
  useEffect(() => {
    getAllTheCategories();
  }, []);

  return (
    <div className="is-flex is-justify-content-space-between">
      <div>
        {categories.map((category) => (
          <Categories key={category.id} category={category} refresh={getAllTheCategories} />
        ))}
      </div>
      <CategoryForm refreshPage={getAllTheCategories} />
    </div>
  );
};
