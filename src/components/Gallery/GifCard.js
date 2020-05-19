import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import ShareButton from "./ShareButton";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    width: props.width,
  }),
  media: (props) => ({
    height: props.height,
    width: props.width,
  }),
}));

const GifCard = (props) => {
  const { data, user } = props;
  const userId = user.getEmail();
  const stored = localStorage.getItem(userId);

  const { title, date, images } = data;
  const { height, width, url } = images.downsized;
  const classes = useStyles({
    height: parseFloat(height),
    width: parseFloat(width),
  });

  const favoriteGifsInitState = {};
  var favoriteGifs = stored ? JSON.parse(stored) : favoriteGifsInitState;

  const [isFavorite, setFavorite] = useState(favoriteGifs.hasOwnProperty(url));

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
    if (favoriteGifs.hasOwnProperty(url)) {
      return;
    }
    favoriteGifs[url] = data;
    setFavorite(true);
    saveFavorites(userId, favoriteGifs);
  };

  const removeFavorite = () => {
    console.log("remove fav");

    delete favoriteGifs[url];
    setFavorite(false);
    saveFavorites(userId, favoriteGifs);
  };

  const saveFavorites = (userId, favoriteGifs) => {
    const toStore = JSON.stringify(favoriteGifs);
    localStorage.setItem(userId, toStore);
  };

  // Gif may not have user in data returned from API
  const gifUser = data.user;
  let username, avatar_url, profile_url;
  if (gifUser) {
    username = gifUser.username;
    avatar_url = gifUser.avatar_url;
    profile_url = gifUser.profile_url;
  } else {
    username = "";
    avatar_url = "/default_avatar.png";
    profile_url = "";
  }
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={url} />
      <CardHeader
        avatar={<Avatar aria-label="avatar" alt={username} src={avatar_url} />}
        title={
          <div>
            <div>{title}</div>
            <div>{username}</div>
          </div>
        }
        subheader={date}
      />
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
