import React from "react";
import LoginButton from "./LoginButton";

const LoginPage = (props) => {
  return (
    <div className="login">
      <LoginButton onSuccess={props.onSuccess} />
    </div>
  );
};

export default LoginPage;
