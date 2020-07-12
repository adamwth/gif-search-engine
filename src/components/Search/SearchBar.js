import React from "react";
import { makeStyles, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
    margin: "0 auto",
    width: "50%",
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.input}
      id="input-with-icon-textfield"
      label="Search"
      placeholder="Trending"
      variant="outlined"
      onChange={props.onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
    // <input
    //   className={classes.input}
    //   onChange={props.onChange}
    //   placeholder="Trending"
    // ></input>
  );
};

export default SearchBar;
