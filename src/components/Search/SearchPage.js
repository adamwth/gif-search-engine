import React, { useRef, useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import List from "../Gallery/List";
import { debounce, makeStyles, Divider } from "@material-ui/core";
import useDebounce from "../../utils/useDebounce";

const apiKey = process.env.REACT_APP_GIPHY_APIKEY;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3em auto",
    width: "90%",
  },
  searchBar: {
    margin: theme.spacing(3, 2),
  },
  list: {
    margin: theme.spacing(2),
  },
}));

/**
 * Constants used for search
 */
const gifsInit = [];
const searchTermInit = "";
const limitInit = 10;
const batchInit = 0;
const loadingInit = false;
const delay = 250;

const SearchPage = () => {
  const [gifs, setGifs] = useState(gifsInit);
  const [searchTerm, setSearchTerm] = useState(searchTermInit);
  const [limit, setLimit] = useState(limitInit);
  const [batch, setBatch] = useState(batchInit);
  const [loading, setLoading] = useState(loadingInit);

  // Debounce the search term so it only gets updated after some delay (ms)
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchMoreResults = () => {
    setBatch(batch + 1);
  };

  const getUrl = () => {
    const apiKeyParam = `?api_key=${apiKey}`;

    let mainQuery;
    let searchTermParam;
    if (searchTerm === "") {
      mainQuery = "trending";
      searchTermParam = "";
    } else {
      mainQuery = "search";
      searchTermParam = `&q=${searchTerm.replace(/\s/g, "+")}`;
    }

    const limitParam = `&limit=${limit}`;
    const offsetParam = `&offset=${batch * limit}`;

    return `https://api.giphy.com/v1/gifs/${mainQuery}${apiKeyParam}${searchTermParam}${limitParam}${offsetParam}`;
  };

  const callApi = () => {
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
        setGifs((gifs) => gifs.concat(gifResults));
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  // Reset gifs and batch number and call API if search term changes
  useEffect(() => {
    setGifs(gifsInit);
    setBatch(batchInit);
    callApi();
  }, [debouncedSearchTerm]);

  // Call API if batch number changes to value other than batchInit
  // Reason for checking batch === batchInit is because search term change
  // triggers batch change to batchInit value
  useEffect(() => {
    if (batch === batchInit) {
      return;
    }
    callApi();
  }, [batch]);

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
      <div className={classes.searchBar}>
        <SearchBar onChange={handleSearchChange} />
      </div>
      <Divider variant="middle" />
      <div className={classes.list}>
        <List
          className={classes.root}
          gifs={gifs}
          ref={lastElementRefCallback}
        />
      </div>
    </div>
  );
};

export default withRouter(SearchPage);
