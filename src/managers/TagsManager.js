export const getAllTags = () => {
  return fetch("http://localhost:8088/tags").then((res) => res.json());
};

export const createTag = (newTag) => {
  return fetch(`http://localhost:8088/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTag),
  }).then((res) => res.json());
};
