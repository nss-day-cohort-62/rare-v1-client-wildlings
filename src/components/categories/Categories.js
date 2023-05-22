import { deleteCategory } from "../../managers/CategoriesManager"
import { useNavigate, useParams } from "react-router-dom"





export default function Categories({ category, refresh }) {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const deleteCategoryEvent = (e, categoryId) => {
    deleteCategory(categoryId).then(() => 
    {refresh()})
  }
    return (

      <>
        <h1 key={category.id}>{category.label}</h1>
        <button>Edit</button>
        <button onClick={(e) => deleteCategoryEvent(e, category.id)}>Delete</button>
      </>
    )
  }
