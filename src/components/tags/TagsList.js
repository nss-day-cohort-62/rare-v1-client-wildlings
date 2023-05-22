import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagsManager";
import Tags from "./Tags";
import { TagForm } from "./TagForm";

export const TagsList = () => {
  const [tags, setTags] = useState([]);

  
  const getAllTheTags = () => {
    getAllTags().then((data) => {
      const sortedTags = data.sort((a, b) => a.label.localeCompare(b.label));
      setTags(sortedTags);
    });
  };

  useEffect(() => {
    getAllTheTags();
  }, []);

  return (
    <div className="is-flex is-justify-content-space-between">
      <div>
        {tags.map((tag) => (
          <Tags key={tag.id} tag={tag} />
        ))}
      </div>
      <TagForm refreshPage={getAllTheTags} />
    </div>
  );
};
