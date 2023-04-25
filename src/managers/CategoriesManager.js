export const getAllCategories = () => {
  return fetch("http://localhost:8088/categories").then((res) => res.json());
};

export const createCategory = (categoryToSubmit) => {
  return fetch("http://localhost:8088/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryToSubmit),
  }).then((res) => res.json());
};
