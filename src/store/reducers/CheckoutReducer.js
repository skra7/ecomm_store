import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  checkoutLocation: "",
  error: "",
  status: "",
};
const checkoutSuccess = (state, action) => {
  return updateObject(state, {
    checkoutLocation: action.data,
    status: action.status,
  });
};
const setStatus = (state, action) => {
  return updateObject(state, {
    status: "",
    error: "",
  });
};
const checkoutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKOUT_SUCCESS:
      return checkoutSuccess(state, action);
    case actionTypes.CHECKOUT_FAIL:
      return checkoutFail(state, action);
    case actionTypes.SET_CHECKOUT_STATUS:
      return setStatus(state, action);
    default:
      return state;
  }
};
export default checkoutReducer;
