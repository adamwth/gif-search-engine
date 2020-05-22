import React from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

const BottomNavBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // Sets the bottom navigation based on current route location
  const pathname = props.location.pathname;
  if (pathname === "/" && value !== 0) {
    setValue(0);
  } else if (pathname === "/favorites" && value !== 1) {
    setValue(1);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Trending"
        icon={<RestoreIcon />}
        component={Link}
        to={"/"}
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to={"/favorites"}
      />
    </BottomNavigation>
  );
};

export default withRouter(BottomNavBar);
