import types from "../Actions/types";

const initState = {
  isSignedIn: false,
  user: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      console.log("signed in!");
      return {
        ...state,
        isSignedIn: true,
        user: action.user.getBasicProfile(),
      };
    }
    case types.LOGOUT: {
      return { ...state, ...initState };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
