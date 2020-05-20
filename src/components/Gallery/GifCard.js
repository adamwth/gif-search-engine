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
import { addFavorite, removeFavorite } from "../../Store/Actions";

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

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

const GifCard = (props) => {
  const { data, user, favorites } = props;
  console.log(data);

  const { title, date, images } = data;
  const { height, width, url } = images.downsized;

  const [isFavorite, setFavorite] = useState(favorites.hasOwnProperty(url));

  //TODO: might want to refactor this to save to redux state (which is configured to then save to local storage)
  const addFavorite = () => {
    console.log("add fav");
    if (isFavorite) {
      return;
    }
    props.addFavorite(user, data);
    setFavorite(true);
  };

  const removeFavorite = () => {
    console.log("remove fav");
    if (!isFavorite) {
      return;
    }
    props.removeFavorite(user, data);
    setFavorite(false);
  };

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
  const { user } = state.auth;
  return {
    user: user,
    favorites: state.favorites[user] ? state.favorites[user] : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (user, item) => dispatch(addFavorite(user, item)),
    removeFavorite: (user, item) => dispatch(removeFavorite(user, item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GifCard);
