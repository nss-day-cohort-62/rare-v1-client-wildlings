import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagsManager";
import Tags from "./Tags";

export const TagsList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then((data) => {
      setTags(data);
    });
  }, []);

  return <>
    {
      tags.map(
        (tag) => <Tags key={tag.id} tag={tag} />
      )
    }
  </>

};
