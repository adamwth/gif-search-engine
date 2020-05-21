import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./components/Search/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import BottomNavBar from "./components/Navigation/BottomNavBar";
import { connect } from "react-redux";
import TopAppBar from "./components/Navigation/TopAppBar";
import { Snackbar } from "@material-ui/core";
import AlertMessage from "./components/Alert/AlertMessage";
import alertTypes from "./components/Alert/AlertTypes";

const App = (props) => {
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertType, setAlertType] = useState(alertTypes.NONE);

  const handleLoginSuccess = (googleUser) => {
    console.log("run handle login success");
    setAlertType(alertTypes.LOGIN_SUCCESS);
    setAlertFlag(true);
  };

  const handleLoginFailure = () => {
    console.log("run handle login failure");

    setAlertType(alertTypes.LOGIN_FAILURE);
    setAlertFlag(true);
  };

  const handleLogout = () => {
    console.log("run handle logout");

    setAlertType(alertTypes.LOGOUT);
    setAlertFlag(true);
  };

  const handleClose = () => {
    setAlertType(alertTypes.NONE);
    setAlertFlag(false);
  };

  return (
    <>
      <TopAppBar
        handleLoginSuccess={handleLoginSuccess}
        handleLoginFailure={handleLoginFailure}
        handleLogout={handleLogout}
      />
      <Switch>
        {/* <Route
          path="/"
          exact
          render={(props) => (
            <LoginPage
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              {...props}
            />
          )}
        /> */}
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
      <Snackbar open={alertFlag} autoHideDuration={6000} onClose={handleClose}>
        <AlertMessage alertType={alertType} handleClose={handleClose} />
      </Snackbar>
      <BottomNavBar />
    </>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, null)(App);
