import React from "react";
import { withRouter } from "react-router-dom";
import List from "../Gallery/List";
import { connect } from "react-redux";

class FavoritesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };
  }

  componentDidMount() {
    console.log("favorites page");
    //TODO: refactor this into helper method or use redux state, because overlapping with gifcard local storage access
    const { user } = this.props;
    const userId = user.getEmail();
    const stored = localStorage.getItem(userId);

    const favoriteGifsInitState = {};
    var favoriteGifs = stored ? JSON.parse(stored) : favoriteGifsInitState;
    this.setState({
      gifs: Object.values(favoriteGifs),
    });
    console.log(this.state.gifs);
  }

  render = (props) => {
    return (
      <div className="favorites-page">
        <div className="dummy"></div>
        <List gifs={this.state.gifs} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state.auth;
};

export default withRouter(connect(mapStateToProps, null)(FavoritesPage));
