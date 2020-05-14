import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import BottomNavBar from "../BottomNavBar";
import SearchPage from "../SearchPage";
import FavoritesPage from "../FavoritesPage";

const Home = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
      </Switch>
      <BottomNavBar />
    </div>
  );
};

export default withRouter(Home);
