import React from "react";
import types from "./AlertTypes";
import Alert from "@material-ui/lab/Alert";

const AlertMessage = (props) => {
  const { alertType, handleClose } = props;
  switch (alertType) {
    case types.LOGIN_SUCCESS:
      return (
        <Alert onClose={handleClose} severity="success">
          Login success!
        </Alert>
      );
    case types.LOGIN_FAILURE:
      return (
        <Alert onClose={handleClose} severity="error">
          Error logging in, please try again later
        </Alert>
      );
    case types.LOGOUT:
      return (
        <Alert onClose={handleClose} severity="success">
          Logout success!
        </Alert>
      );
    case types.LOGIN_PROMPT:
      return (
        <Alert onClose={handleClose} severity="error">
          You need to be signed in to carry out this action.
        </Alert>
      );
    default:
      return <div></div>;
  }
};

export default AlertMessage;
