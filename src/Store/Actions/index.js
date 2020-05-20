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

export const addFavorite = (user, item) => {
  return {
    type: types.ADD_FAVORITE,
    user: user,
    item: item,
  };
};

export const removeFavorite = (user, item) => {
  return {
    type: types.REMOVE_FAVORITE,
    user: user,
    item: item,
  };
};
