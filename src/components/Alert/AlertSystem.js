import React, { useState } from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import types from "./AlertTypes";
import AlertMessage from "./AlertMessage";
import { alert } from "../../Store/Actions";

const AlertSystem = (props) => {
  const { alertType, alert } = props;

  const handleClose = () => {
    alert(types.NONE);
  };

  return (
    <Snackbar
      open={alertType !== types.None}
      autoHideDuration={6000}
      // onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AlertMessage alertType={alertType} handleClose={handleClose} />
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state.alert;
};

const mapDispatchToProps = (dispatch) => {
  return {
    alert: (alertType) => dispatch(alert(alertType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertSystem);
