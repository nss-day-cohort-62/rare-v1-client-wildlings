const url = "http://localhost:8000"

export const getAllCategories = () => {
  return fetch(`${url}/categories`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    }}).then((res) => res.json());
};

export const createCategory = (categoryToSubmit) => {
  return fetch(`${url}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(categoryToSubmit),
  }).then((res) => res.json());
};

export const deleteCategory = (categoryId) => {
  return fetch(`http://localhost:8000/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`
    }
  });
};

