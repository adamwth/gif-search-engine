import React from "react";
import { withRouter } from "react-router-dom";
import List from "../Gallery/List";
import { connect } from "react-redux";

const FavoritesPage = (props) => {
  const favoriteGifs = Object.values(props.favorites);
  return (
    <div className="favorites-page">
      <div className="dummy"></div>
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
