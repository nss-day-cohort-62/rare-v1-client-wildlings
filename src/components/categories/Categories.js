

export default function Categories({ category }) {
    return (
      <>
        <h1 key={category.id}>{category.label}</h1>
        <button>Edit</button>
        <button>Delete</button>
      </>
    )
  }