import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { alert } from "../../Store/Actions";
import alertTypes from "../Alert/AlertTypes";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated = false,
  alert,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          alert(alertTypes.LOGIN_PROMPT);
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    alert: (alertType) => dispatch(alert(alertType)),
  };
};

export default connect(null, mapDispatchToProps)(ProtectedRoute);
