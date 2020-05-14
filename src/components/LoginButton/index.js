import React from "react";
import auth from "../Auth";

const GOOGLE_BUTTON_ID = "google-login";

class LoginButton extends React.Component {
  initGoogle(func) {
    const onSuccess = (res) => {
      func();
      this.props.onSuccess(res);
    };
    auth.setupLogin(onSuccess, GOOGLE_BUTTON_ID);
  }
  componentDidMount() {
    // Set interval because window.gapi sometimes doesn't load before component mounts
    const googleLoadTimer = setInterval(() => {
      if (window.gapi) {
        this.initGoogle(() => {
          clearInterval(googleLoadTimer);
        });
      }
    }, 90);
  }

  render() {
    return <div id={GOOGLE_BUTTON_ID} />;
  }
}

export default LoginButton;
