import React from "react";
import Item from "../Item";

const List = (props) => {
  const gifs = props.gifs.map((gif) => {
    return <Item key={gif.id} gif={gif} />;
  });
  return <div className="list">{gifs}</div>;
};

export default List;
