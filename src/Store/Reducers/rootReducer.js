import authReducer from "./authReducer";
import favoriteReducer from "./favoriteReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoriteReducer,
});

export default rootReducer;
