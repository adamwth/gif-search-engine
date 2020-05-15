import React from "react";
import { connect } from "react-redux";
import { login } from "../../Store/Actions";
import { withRouter } from "react-router-dom";

const GOOGLE_BUTTON_ID = "google-login";

class LoginButton extends React.Component {
  initGoogle(func) {
    const onSuccess = (res) => {
      func();
      this.props.onSuccess(res);
      this.props.login(res);
    };

    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
        })
        .then(() => {
          func();
          window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            scope: "profile email",
            width: 250,
            height: 50,
            longtitle: false,
            theme: "dark",
            onsuccess: onSuccess,
            onfailure: this.props.onFailure,
          });
        });
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginUser) => dispatch(login(loginUser)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginButton));
