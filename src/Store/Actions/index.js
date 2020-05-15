import types from "./types";

/**
 * Login action creator
 * @param {User returned from gapi onSuccess call} loginUser
 */
export const login = (loginUser) => {
  return {
    type: types.LOGIN,
    user: loginUser,
  };
};

/**
 * Logout action creator
 */
export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};
