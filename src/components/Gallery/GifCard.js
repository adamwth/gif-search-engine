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
import { addFavorite, removeFavorite, alert } from "../../Store/Actions";
import alertTypes from "../Alert/AlertTypes";

// Styling for gif card contents
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    maxWidth: "80%",
    width: props.width,
  }),
  media: (props) => ({
    height: props.height,
    width: props.width,
  }),
}));

const GifCard = (props) => {
  const {
    data,
    user,
    isSignedIn,
    favorites,
    addFavorite,
    removeFavorite,
    alert,
  } = props;

  const { title, date, images, originalSrc } = data;

  const [isFavorite, setFavorite] = useState(
    favorites.hasOwnProperty(originalSrc)
  );

  const checkSignedIn = () => {
    console.log(isSignedIn);
    if (!isSignedIn) {
      alert(alertTypes.LOGIN_PROMPT);
      return false;
    }
    return true;
  };

  const handleAddFavorite = () => {
    const canAddFavorite = checkSignedIn();
    if (!canAddFavorite || isFavorite) {
      return;
    }
    console.log("add fav");
    addFavorite(user, data);
    setFavorite(true);
  };

  const handleRemoveFavorite = () => {
    const canAddFavorite = checkSignedIn();
    if (!canAddFavorite || !isFavorite) {
      return;
    }
    console.log("remove fav");
    removeFavorite(user, data);
    setFavorite(false);
  };

  const favoriteIcon = () => {
    if (isFavorite) {
      return (
        <IconButton aria-label="favorited" onClick={handleRemoveFavorite}>
          <FavoriteIcon />
        </IconButton>
      );
    }
    return (
      <IconButton aria-label="add to favorites" onClick={handleAddFavorite}>
        <FavoriteBorderIcon />
      </IconButton>
    );
  };

  // Gif may not have upload user in data returned from API
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

  const { url } = images.downsized;

  const classes = useStyles({
    height: data.height,
    width: data.width,
  });

  return (
    <Card className={classes.root}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardMedia className={classes.media} image={url} />
      </a>
      <CardHeader
        avatar={
          <a href={profile_url} target="_blank" rel="noopener noreferrer">
            <Avatar aria-label="avatar" alt={username} src={avatar_url} />
          </a>
        }
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
  const { user, isSignedIn } = state.auth;
  return {
    user: user,
    isSignedIn: isSignedIn,
    favorites: state.favorites[user] ? state.favorites[user] : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (user, item) => dispatch(addFavorite(user, item)),
    removeFavorite: (user, item) => dispatch(removeFavorite(user, item)),
    alert: (alertType) => dispatch(alert(alertType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GifCard);
