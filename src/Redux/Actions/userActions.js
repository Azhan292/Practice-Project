import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  REMOVE_USER,
  SET_USER_TYPE,
  REMOVE_USER_TYPE,
} from "../Constants/ActionTypes";

export const userrequest = () => {
  return {
    type: USER_REQUEST,
  };
};

export const usersuccess = (user) => {
  return {
    type: USER_SUCCESS,
    payload: user,
  };
};

export const userfailure = (error) => {
  return {
    type: USER_FAILURE,
    payload: error,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};

export const removeUserType = () => {
  return {
    type: REMOVE_USER_TYPE,
  };
};
