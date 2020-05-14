import types from "../Actions/types";

const initState = {};

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_SEARCH_RESULTS: {
      return state.merge({
        searchResults: action.results,
      });
    }
    default: {
      return state;
    }
  }
};

export default searchReducer;
