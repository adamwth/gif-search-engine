import types from "../Actions/types";

const initState = {};

const favoriteReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_FAVORITE: {
      console.log("add favorite");
      const url = action.item.images.downsized.url;
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          [url]: action.item,
        },
      };
    }
    case types.REMOVE_FAVORITE: {
      console.log("remove favorite");
      const url = action.item.images.downsized.url;
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
