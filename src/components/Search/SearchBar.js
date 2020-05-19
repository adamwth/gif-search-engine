import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "block",
    fontSize: "22px",
    height: "50px",
    margin: "0 auto",
    textAlign: "center",
    width: "50%",
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  return <input className={classes.input} onChange={props.onChange}></input>;
};

export default SearchBar;
