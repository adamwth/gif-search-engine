import React from "react";
import "../../styles/app.css";

const Item = (props) => {
  return (
    <div className="item">
      <img src={props.gif.images.downsized.url} />
    </div>
  );
};

export default Item;
