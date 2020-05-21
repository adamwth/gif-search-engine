import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import LogoutButton from "../Login/LogoutButton";
import { Grid, Avatar, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import LoginButton from "../Login/LoginButton";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "center",
  },
  auth: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const TopAppBar = (props) => {
  const classes = useStyles();
  const { isSignedIn, user, handleLogout, ...loginHandlers } = props;
  console.log(user.avatar);
  const authComponent = isSignedIn ? (
    <>
      <Grid item xs={1} className={classes.auth}>
        <Avatar aria-label="avatar" src={user.avatar} />
      </Grid>
      <Grid item xs={1} className={classes.auth}>
        <LogoutButton handleLogout={handleLogout} />
      </Grid>
    </>
  ) : (
    <LoginButton {...loginHandlers} />
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar position="sticky" color="white">
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={0}
            >
              <Grid item xs={2}></Grid>

              <Grid item xs={8} className={classes.title}>
                <Typography type="title" color="inherit">
                  GIFS!
                </Typography>
              </Grid>
              {authComponent}
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(TopAppBar);
