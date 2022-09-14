import { PROFILE_PENDING, PROFILE_SUCCESS, PROFILE_FAILURE, SET_USER_DATA, SET_USER } from './actions';
import User from "../../utils/constants";

const initialState = {
  authed: false,
  user: new User(),
  request: {
    status: 0,
    error: null,
  },
};

export const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PROFILE_PENDING: {
      return {
        ...state,
        request: {
          status: 1,
          error: null,
        }
      }
    }
    case PROFILE_SUCCESS: {
      return {
        ...state,
        request: {
          status: 2,
          error: null,
        }
      }
    }
    case PROFILE_FAILURE: {
      return {
        ...state,
        request: {
          status: 3,
          error: payload,
        }
      }
    }
    case SET_USER: {
      return {
        ...state,
        authed: payload,
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        user: payload,
      }
    }
    default: return state;
  };
};
