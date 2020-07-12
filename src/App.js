import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./components/Search/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import BottomNavBar from "./components/Navigation/BottomNavBar";
import { connect } from "react-redux";
import TopAppBar from "./components/Navigation/TopAppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AlertSystem from "./components/Alert/AlertSystem";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Helvetica Neue",
  },
});

const App = (props) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar />
        <Switch>
          <Route
            exact
            path="/"
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
        <AlertSystem />
        <BottomNavBar />
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(App);
