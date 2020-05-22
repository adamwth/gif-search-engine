import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./components/Search/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import BottomNavBar from "./components/Navigation/BottomNavBar";
import { connect } from "react-redux";
import TopAppBar from "./components/Navigation/TopAppBar";
import { Snackbar, createMuiTheme, ThemeProvider } from "@material-ui/core";
import AlertMessage from "./components/Alert/AlertMessage";
import alertTypes from "./components/Alert/AlertTypes";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Helvetica Neue",
  },
});

const App = (props) => {
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertType, setAlertType] = useState(alertTypes.NONE);

  const handleLoginSuccess = (googleUser) => {
    setAlertType(alertTypes.LOGIN_SUCCESS);
    setAlertFlag(true);
  };

  const handleLoginFailure = () => {
    setAlertType(alertTypes.LOGIN_FAILURE);
    setAlertFlag(true);
  };

  const handleLogout = () => {
    setAlertType(alertTypes.LOGOUT);
    setAlertFlag(true);
  };

  const handleClose = () => {
    setAlertType(alertTypes.NONE);
    setAlertFlag(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar
          handleLoginSuccess={handleLoginSuccess}
          handleLoginFailure={handleLoginFailure}
          handleLogout={handleLogout}
        />
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
        <Snackbar
          open={alertFlag}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <AlertMessage alertType={alertType} handleClose={handleClose} />
        </Snackbar>
        <BottomNavBar />
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(App);
