import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoriesManager";
import { CategoryForm } from "./CategoryForm";
import Categories from "./Categories";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className="is-flex is-justify-content-space-between">
      <div>
        {categories.map((category) => (
          <Categories key={category.id} category={category} />
        ))}
      </div>
      <CategoryForm />
    </div>
  );
};
