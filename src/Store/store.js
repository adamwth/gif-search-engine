import { createStore } from "redux";
import rootReducer from "./Reducers/rootReducer";

const auth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : undefined;

const favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : undefined;

const saveUser = () => {
  const auth = store.getState().auth;
  const favorites = store.getState().favorites;
  localStorage.setItem("auth", JSON.stringify(auth));
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const store = createStore(rootReducer, {
  auth: auth,
  favorites: favorites,
});
store.subscribe(saveUser);

export default store;
