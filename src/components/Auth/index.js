class Auth {
  constructor() {
    this.isAuthenticated = false;
  }

  login(callback) {
    this.isAuthenticated = true;
    callback();
  }

  logout(callback) {
    this.isAuthenticated = false;
    callback();
  }

  isAuthenticated() {
    return this.isAuthenticated;
  }
}

const auth = new Auth();

export default auth;
