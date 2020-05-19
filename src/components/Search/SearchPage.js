import React, { useRef, useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import List from "../Gallery/List";
import { debounce, makeStyles } from "@material-ui/core";

const apiKey = process.env.REACT_APP_GIPHY_APIKEY;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3em auto",
    width: "90%",
  },
}));

const SearchPage = () => {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [batch, setBatch] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    callApi();
  };

  const fetchMoreResults = () => {
    setBatch(batch + 1);
    callApi();
  };

  const getUrl = () => {
    const mainQuery = searchTerm === "" ? "trending" : "search";
    const apiKeyParam = `?api_key=${apiKey}`;

    const searchTermParam = `&q=${searchTerm.replace(/\s/g, "+")}`;
    const limitParam = `&limit=${limit}`;
    const offsetParam = `&offset=${batch * limit}`;

    return `https://api.giphy.com/v1/gifs/${mainQuery}${apiKeyParam}${searchTermParam}${limitParam}${offsetParam}`;
  };

  const _callApi = () => {
    const url = getUrl();
    console.log(url);

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const gifResults = data.data.map((gif) => {
          const { title, images, source, import_datetime } = gif;
          const { url, height, width } = images.fixed_height;
          return {
            title: title,
            source: source,
            date: import_datetime,
            src: url,
            height: height,
            width: width,
          };
        });
        setGifs(gifs.concat(gifResults));
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const callApi = debounce(_callApi, 150);

  useEffect(() => {
    fetchMoreResults();
  }, []);

  // Infinite scroll
  const observer = useRef();
  const lastElementRefCallback = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          // If the last displayed item is not visible, return
          if (!entries[0].isIntersecting) {
            console.log("Last element not visible");
            return;
          }
          console.log(`Last element visible`);
          fetchMoreResults();
          // observer.current.unobserve(element);
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Rendering
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchBar onChange={handleSearchChange} />
      <List gifs={gifs} ref={lastElementRefCallback} />
    </div>
  );
};

// class SearchPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gifs: [],
//       searchTerm: "",
//       apiKey: process.env.REACT_APP_GIPHY_APIKEY,
//       limit: 25,
//       gifBatch: 0,
//       loading: false,
//     };
//     this.callApi = debounce(this.callApi, 150);
//   }

//   componentDidMount = () => {
//     this.callApi(this.getUrl());
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchTerm: event.target.value });
//     this.callApi(this.getUrl());
//   };

//   fetchMoreResults = () => {
//     console.log("fetch more");
//     // this.setState({ gifBatch: this.state.gifBatch + 1 });
//     // this.callApi(this.getUrl());
//   };

//   getUrl = () => {
//     const { apiKey, searchTerm, limit, gifBatch } = this.state;

//     const mainQuery = searchTerm === "" ? "trending" : "search";
//     // console.log(mainQuery);
//     const apiKeyParam = `?api_key=${apiKey}`;

//     const searchTermParam = `&q=${searchTerm.replace(/\s/g, "+")}`;
//     const limitParam = `&limit=${limit}`;
//     const offsetParam = `&offset=${gifBatch * limit}`;

//     return `https://api.giphy.com/v1/gifs/${mainQuery}${apiKeyParam}${searchTermParam}${limitParam}${offsetParam}`;
//   };

//   callApi = (url) => {
//     console.log(url);
//     this.setState({ loading: true });
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         const gifs = data.data.map((gif) => {
//           const { title, images, source, import_datetime } = gif;
//           return {
//             title: title,
//             url: images.downsized.url,
//             source: source,
//             date: import_datetime,
//           };
//         });
//         this.setState({ gifs: gifs });
//         this.setState({ loading: false });
//       })
//       .catch((e) => console.log(e));
//   };

//   render() {
//   }
// }

export default withRouter(SearchPage);
