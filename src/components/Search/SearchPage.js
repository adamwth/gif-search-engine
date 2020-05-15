import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import List from "../Gallery/List";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      apiKey: process.env.REACT_APP_GIPHY_APIKEY,
      limit: 20,
    };
  }

  componentDidMount = () => {
    this.callApi(this.getTrendingUrl());
  };

  handleSearchChange = (event) => {
    this.callApi(this.getSearchUrl(event.target.value));
  };

  getTrendingUrl() {
    const apiKey = `?api_key=${this.state.apiKey}`;
    const limit = `&limit=${this.state.limit}`;
    return `https://api.giphy.com/v1/gifs/trending${apiKey}${limit}`;
  }

  getSearchUrl(term) {
    const apiKey = `?api_key=${this.state.apiKey}`;
    const searchTerm = `&q=${term.replace(/\s/g, "+")}`;
    const limit = `&limit=${this.state.limit}`;
    return `https://api.giphy.com/v1/gifs/search${apiKey}${searchTerm}${limit}`;
  }

  callApi(url) {
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
      })
      .catch((e) => console.log(e));
  }

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
