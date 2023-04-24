export default function Tags({ tag }) {
  return (
    <>
      <h1 key={tag.id}>{tag.label}</h1>
      <button>Edit</button>
      <button>Delete</button>
    </>
  )
}
