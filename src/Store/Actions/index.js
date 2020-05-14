import types from "./types";

export const login = (loginUser) => {
  return {
    type: types.LOGIN,
    user: loginUser,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};
