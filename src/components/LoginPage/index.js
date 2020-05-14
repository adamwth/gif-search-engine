import React from "react";
import Login from "../Login";

const LoginPage = (props) => {
  return (
    <div>
      <Login onSuccess={props.onSuccess} />
    </div>
  );
};

export default LoginPage;
