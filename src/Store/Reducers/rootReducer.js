import authReducer from "./authReducer";
import favoriteReducer from "./favoriteReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoriteReducer,
  alert: alertReducer,
});

export default rootReducer;
