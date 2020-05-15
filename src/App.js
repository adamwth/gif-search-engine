import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SearchPage from "./components/Search/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import LogoutButton from "./components/Login/LogoutButton";
import { connect } from "react-redux";

const App = (props) => {
  const handleLoginSuccess = (googleUser) => {
    // const profile = googleUser.getBasicProfile();
    // console.log(`Name:${profile.getName()}`);
    console.log("Login success");
  };

  const handleLoginFailure = () => {
    console.log("Login failure");
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <>
      <LogoutButton onClick={handleLogout} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <LoginPage
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              {...props}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/search"
          component={SearchPage}
          isAuthenticated={props.isSignedIn}
        />
        <ProtectedRoute
          exact
          path="/favorites"
          component={FavoritesPage}
          isAuthenticated={props.isSignedIn}
        />
      </Switch>
      <BottomNavBar />
    </>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(App);
