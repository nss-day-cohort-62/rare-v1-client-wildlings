const url = "http://localhost:8000"

export const getAllTags = () => {
  return fetch(`${url}/tags`).then((res) => res.json());
};

export const createTag = (newTag) => {
  return fetch(`${url}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTag),
  }).then((res) => res.json());
};
