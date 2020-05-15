import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import ShareButton from "./ShareButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  text: {
    margin: "10px",
    padding: "10px",
    // paddingLeft: "1em",
    // paddingRight: "1em",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const GifCard = (props) => {
  const classes = useStyles();

  const { gif, user } = props;
  const userId = user.getEmail();
  const stored = localStorage.getItem(userId);

  const favoriteGifsInitState = {};
  var favoriteGifs = stored ? JSON.parse(stored) : favoriteGifsInitState;

  const [isFavorite, setFavorite] = useState(
    favoriteGifs.hasOwnProperty(gif.url)
  );

  const favoriteIcon = () => {
    if (isFavorite) {
      return (
        <IconButton aria-label="favorited" onClick={removeFavorite}>
          <FavoriteIcon />
        </IconButton>
      );
    }
    return (
      <IconButton aria-label="add to favorites" onClick={addFavorite}>
        <FavoriteBorderIcon />
      </IconButton>
    );
  };

  //TODO: might want to refactor this to save to redux state (which is configured to then save to local storage)
  const addFavorite = () => {
    console.log("add fav");
    if (favoriteGifs.hasOwnProperty(gif.url)) {
      return;
    }
    favoriteGifs[gif.url] = gif;
    setFavorite(true);
    saveFavorites(userId, favoriteGifs);
  };

  const removeFavorite = () => {
    console.log("remove fav");

    delete favoriteGifs[gif.url];
    setFavorite(false);
    saveFavorites(userId, favoriteGifs);
  };

  const saveFavorites = (userId, favoriteGifs) => {
    const toStore = JSON.stringify(favoriteGifs);
    localStorage.setItem(userId, toStore);
  };

  const { title, url, source, date } = gif;

  return (
    <Card className={classes.root}>
      <CardHeader title={title} />
      <CardMedia className={classes.media} image={url} />
      <CardContent>
        <Typography
          noWrap={false}
          variant="h6"
          color="textSecondary"
          component="p"
          className="text"
        >
          {source}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="p"
          className="text"
        >
          {date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {favoriteIcon()}
        <ShareButton url={url} />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(GifCard);
