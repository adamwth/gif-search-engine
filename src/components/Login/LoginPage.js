import React from "react";
import LoginButton from "./LoginButton";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginPage = (props) => {
  const { isSignedIn, user } = props;
  if (isSignedIn) {
    console.log(user);
    return <Redirect to="/search" />;
  }
  return (
    <div className="login">
      <LoginButton onSuccess={props.onSuccess} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(LoginPage);
