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

const App = (props) => {
  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log(`Name:${profile.getName()}`);
    console.log(`ID: ${profile.getId()}`);
    props.history.push("/search");
  };

  const onFailure = () => {
    this.setState({ isSignedIn: false });
    console.log("failed to sign in");
  };

  const handleLogout = () => {
    const history = this.props.history;
    console.log(history);
  };

  return (
    <div>
      <>
        <LogoutButton onClick={handleLogout} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <LoginPage
                onSuccess={onSuccess}
                onFailure={onFailure}
                {...props}
              />
            )}
          />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/favorites" component={FavoritesPage} />
        </Switch>
      </>
      <BottomNavBar />
    </div>
  );
};

export default withRouter(App);
