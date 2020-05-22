import types from "../Actions/types";
import alertTypes from "../../components/Alert/AlertTypes";

const initState = {
  alertType: alertTypes.NONE,
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ALERT: {
      console.log(action.alertType);
      return {
        ...state,
        alertType: action.alertType,
      };
    }
    default: {
      return state;
    }
  }
};

export default alertReducer;
