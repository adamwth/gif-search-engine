import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
});

export default rootReducer;
