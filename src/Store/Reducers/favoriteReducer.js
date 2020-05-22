import types from "../Actions/types";

const initState = {};

const favoriteReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_FAVORITE: {
      const url = action.item.originalSrc;
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          [url]: action.item,
        },
      };
    }
    case types.REMOVE_FAVORITE: {
      const url = action.item.originalSrc;
      const { [action.user]: userFavorites, ...otherUsers } = state;
      const { [url]: favoriteToRemove, ...otherFavorites } = userFavorites;
      return { ...otherUsers, [action.user]: otherFavorites };
    }
    default: {
      return state;
    }
  }
};

export default favoriteReducer;
