import React from "react";
import auth from "../Auth";

const GOOGLE_BUTTON_ID = "google-login";

class Login extends React.Component {
  initGoogle(func) {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
        })
        .then(() => {
          window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            scope: "profile email",
            width: 250,
            height: 50,
            longtitle: false,
            theme: "dark",
            onsuccess: (res) => auth.login(() => this.props.onSuccess(res)),
            onfailure: this.onFailure,
          });
        })
        .then(func);
    });
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

export default Login;
