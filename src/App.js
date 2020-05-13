import React from "react";
import Search from "./components/Search";
import List from "./components/List";

class App extends React.Component {
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
    const maxResults = 10;

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

  render() {
    return (
      <div className="App">
        <Search onChange={this.handleSearchChange} />
        <List gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
