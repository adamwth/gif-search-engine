import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../Store/Actions/index";

// function HideOnScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger();

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// TODO: Prevent auto-authorization of previous user - may need to revoke previous user token?
const LogoutButton = (props) => {
  // const classes = useStyles();

  // Return null if page is at login
  // const { pathname } = props.location;
  // if (pathname === "/") {
  //   return null;
  // }

  const onClick = () => {
    window.gapi.load("auth2", () => {
      console.log("loaded gapi");
      var auth2 = window.gapi.auth2.getAuthInstance();
      console.log(auth2);
      auth2.signOut().then(() => {
        console.log("after signout from gapi");
        auth2.disconnect();
        props.logout();
        props.handleLogout();
        props.history.push("/");
      });
    });
  };

  return (
    // <>
    //   <CssBaseline />
    //   <HideOnScroll {...props}>
    //     <Button
    //       className={classes.root}
    //       variant="contained"
    //       color="secondary"
    //       onClick={onClick}
    //     >
    //       Logout
    //     </Button>
    //   </HideOnScroll>
    // </>

    <Button variant="outlined" color="primary" onClick={onClick}>
      Logout
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
