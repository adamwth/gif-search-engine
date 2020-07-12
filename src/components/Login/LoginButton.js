import React from "react";
import { connect } from "react-redux";
import { login, alert } from "../../Store/Actions";
import { withRouter } from "react-router-dom";
import alertTypes from "../Alert/AlertTypes";

const GOOGLE_BUTTON_ID = "google-login";

/**
 * LoginButton dispatches a login action upon clicking
 */
class LoginButton extends React.Component {
  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
        })
        .then(() => {
          window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            scope: "profile email",
            prompt: "consent",
            longtitle: false,
            theme: "light",
            onsuccess: this.onSuccess,
            onfailure: this.props.handleLoginFailure,
          });
        });
    });
  }

  initGoogle = (func) => {};

  onSuccess = (res) => {
    const { login, alert } = this.props;
    const profile = res.getBasicProfile();
    const user = {
      email: profile.getEmail(),
      name: profile.getName(),
      avatar: profile.getImageUrl(),
    };
    login(user);
    alert(alertTypes.LOGIN_SUCCESS);
  };

  render() {
    return <div id={GOOGLE_BUTTON_ID} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginUser) => dispatch(login(loginUser)),
    alert: (alertType) => dispatch(alert(alertType)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginButton));
