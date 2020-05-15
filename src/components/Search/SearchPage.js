import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import List from "../Gallery/List";

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
        const gifs = data.data.map((gif) => {
          const { title, images, source, import_datetime } = gif;
          return {
            title: title,
            url: images.downsized.url,
            source: source,
            date: import_datetime,
          };
        });
        this.setState({ gifs: gifs });
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
