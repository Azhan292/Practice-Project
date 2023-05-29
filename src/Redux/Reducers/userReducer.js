import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  REMOVE_USER,
  SET_USER_TYPE,
  REMOVE_USER_TYPE,
} from "../Constants/ActionTypes";

const initialState = {
  loading: false,
  user: {},
  userType: "",
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };

    case USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };

    case REMOVE_USER:
      return {
        loading: false,
        user: {},
        userType: "",
        error: "",
      };

    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };

    case REMOVE_USER_TYPE:
      return {
        ...state,
        userType: "",
      };

    default:
      return state;
  }
};
