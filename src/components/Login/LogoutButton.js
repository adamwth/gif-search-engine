import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import { alert } from "../../Store/Actions";
import alertTypes from "../Alert/AlertTypes";

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
  root: {},
}));

// TODO: Prevent auto-authorization of previous user - may need to revoke previous user token?
const LogoutButton = (props) => {
  const classes = useStyles();

  const onClick = () => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
      });
      auth2.then(() => {
        auth2.signOut().then(() => {
          console.log("signed out!");
          auth2.disconnect();
          logout();
        });
      });
    });
  };

  const logout = () => {
    const { logout, alert } = props;
    logout();
    alert(alertTypes.LOGOUT);
    props.history.push("/");
  };

  return (
    <Button
      className={classes.root}
      size="small"
      color="primary"
      onClick={onClick}
    >
      Logout
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    alert: (alertType) => dispatch(alert(alertType)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
