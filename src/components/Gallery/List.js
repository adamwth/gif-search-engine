import React from "react";
import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const List = (props) => {
  const gifs = props.gifs.map((gif, index) => {
    return <Item key={gif.id} gif={gif} key={index} />;
  });
  return <div className="list">{gifs}</div>;
};

export default List;
