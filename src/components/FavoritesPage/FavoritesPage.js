import React from "react";
import { withRouter } from "react-router-dom";
import List from "../Search/List";
import { connect } from "react-redux";

class FavoritesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const userId = JSON.stringify(user.getId());
    const stored = localStorage.getItem(userId);
    const favoriteGifs = stored ? JSON.stringify(stored) : [];
    this.setState({
      gifs: favoriteGifs,
    });
  }

  render = (props) => {
    return (
      <div className="favorites-page">
        Favorites
        <List gifs={this.state.gifs} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state.auth;
};

export default withRouter(connect(mapStateToProps, null)(FavoritesPage));
