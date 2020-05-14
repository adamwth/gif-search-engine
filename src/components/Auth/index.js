class Auth {
  constructor() {
    this.authInstance = null;
    this.isAuthenticated = false;
  }

  setupLogin = (onSuccess, loginButtonId) => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
        })
        .then(() => {
          this.authInstance = window.gapi.auth2.getAuthInstance();
        })
        .then(() => {
          window.gapi.signin2.render(loginButtonId, {
            scope: "profile email",
            width: 250,
            height: 50,
            longtitle: false,
            theme: "dark",
            onsuccess: onSuccess,
            onfailure: () => {},
          });
        });
    });
  };

  logout(callback) {
    if (!this.authInstance) {
      console.log("auth instance not initialized");
      return;
    }
    this.authInstance.signOut();
    callback();
  }

  isAuthenticated() {
    if (!this.authInstance) {
      console.log("auth instance not initialized");
      return false;
    }
    return this.authInstance.isSignedIn.get();
  }
}

const auth = new Auth();

export default auth;
