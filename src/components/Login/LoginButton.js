import React from "react";
import { connect } from "react-redux";
import { login } from "../../Store/Actions";
import { withRouter } from "react-router-dom";

const GOOGLE_BUTTON_ID = "google-login";

/**
 * LoginButton dispatches a login action upon clicking
 */
class LoginButton extends React.Component {
  componentDidMount() {
    console.log("mount login");
    // Set interval because window.gapi sometimes doesn't load before component mounts
    const googleLoadTimer = setInterval(() => {
      if (window.gapi) {
        this.initGoogle(() => {
          clearInterval(googleLoadTimer);
        });
      }
    }, 90);
  }

  initGoogle = (func) => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
        })
        .then(() => {
          func();
          window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            scope: "profile email",
            longtitle: false,
            theme: "light",
            onsuccess: this.onSuccess,
            onfailure: this.props.handleLoginFailure,
          });
        });
    });
  };

  onSuccess = (res) => {
    const { login, handleLoginSuccess } = this.props;
    const profile = res.getBasicProfile();
    const user = {
      email: profile.getEmail(),
      name: profile.getName(),
      avatar: profile.getImageUrl(),
    };
    login(user);
    handleLoginSuccess();
  };

  render() {
    // return <Button>fuck you</Button>;
    return <div id={GOOGLE_BUTTON_ID} />;
    // return <div class="g-signin2" data-onsuccess="onSignIn"></div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginUser) => dispatch(login(loginUser)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginButton));
