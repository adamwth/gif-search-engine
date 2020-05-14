import React from "react";
import { withRouter } from "react-router-dom";
import List from "../List";
import BottomNavBar from "../BottomNavBar";

class FavoritesPage extends React.Component {
  render = (props) => {
    return (
      <div className="favorites-page">
        Favorites
        <List gifs={[]} />
      </div>
    );
  };
}

export default withRouter(FavoritesPage);
