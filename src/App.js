import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import Home from "./components/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import FavoritesPage from "./components/FavoritesPage";
import BottomNavBar from "./components/BottomNavBar";
import LogoutButton from "./components/LogoutButton";
import auth from "./components/Auth";

const App = (props) => {
  const handleLoginSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log(`Name:${profile.getName()}`);
    console.log(`ID: ${profile.getId()}`);
    props.history.push("/search");
  };

  const handleLoginFailure = () => {
    console.log("failed to sign in");
  };

  const handleLogout = () => {
    const history = props.history;
    auth.logout(() => {
      props.history.push("/");
    });
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

export default withRouter(App);
