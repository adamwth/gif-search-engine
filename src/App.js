import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SearchPage from "./components/Search/SearchPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import LogoutButton from "./components/Login/LogoutButton";
import auth from "./components/Auth";
import { connect } from "react-redux";

const App = (props) => {
  const handleLoginSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log(`Name:${profile.getName()}`);
    props.history.push("/search");
  };

  const handleLoginFailure = () => {
    console.log("failed to sign in");
  };

  const handleLogout = () => {
    const history = props.history;
    props.history.push("/");
    console.log(history);
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
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
      </Switch>
      <BottomNavBar />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default withRouter(App);
