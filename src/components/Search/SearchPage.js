import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import List from "./List";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };
  }

  handleSearchChange = (event) => {
    this.getSearchResults(event.target.value);
  };

  getSearchResults(term) {
    const maxResults = 20;

    const apiKey = `?api_key=${process.env.REACT_APP_GIPHY_APIKEY}`;
    const searchTerm = `&q=${term.replace(/\s/g, "+")}`;
    const limit = `&limit=${maxResults}`;

    const url = `http://api.giphy.com/v1/gifs/search${apiKey}${searchTerm}${limit}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ gifs: data.data });
      });
  }

  handleLogout = () => {
    const history = this.props.history;
    console.log(history);
  };

  render() {
    return (
      <div className="search-engine">
        <SearchBar onChange={this.handleSearchChange} />
        <List gifs={this.state.gifs} />
      </div>
    );
  }
}

export default withRouter(SearchPage);
