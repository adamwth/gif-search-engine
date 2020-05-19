import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
// import "./styles/app.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Store/Reducers/rootReducer";
// import createSagaMiddleware from "redux-saga";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run();

const loggedInUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : undefined;

const saveUser = () => {
  const auth = store.getState().auth;
  localStorage.setItem("auth", JSON.stringify(auth));
};

const store = createStore(rootReducer, loggedInUser);
store.subscribe(saveUser);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
