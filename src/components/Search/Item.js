import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Item = (props) => {
  return (
    <div className="item">
      <img src={props.gif.images.downsized.url} />
    </div>
  );
};

export default Item;
