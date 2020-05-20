import React from "react";
import { withRouter } from "react-router-dom";
import List from "../Gallery/List";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5em auto",
    width: "90%",
  },
}));

const FavoritesPage = (props) => {
  const favoriteGifs = Object.values(props.favorites);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List gifs={favoriteGifs} />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    favorites: state.favorites[user] ? state.favorites[user] : {},
  };
};

export default withRouter(connect(mapStateToProps, null)(FavoritesPage));
