import types from "../Actions/types";

const initState = {
  gifs: [],
  searchTerm: "",
  batch: 0,
};

const cacheGifsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_GIFS: {
      return {
        ...state,
        gifs: state.gifs.concat(action.gifs),
        batch: action.batch,
      };
    }
    case types.REPLACE_GIFS: {
      return {
        ...state,
        gifs: action.gifs,
        searchTerm: action.searchTerm,
        batch: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default cacheGifsReducer;
