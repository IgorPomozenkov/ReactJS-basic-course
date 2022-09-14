import { MESSAGES_PENDING, MESSAGES_SUCCESS, MESSAGES_FAILURE, SET_MESSAGES } from "./actions";

const initialState = {
  messagesList: {},
};

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGES_PENDING: {
      return {
        ...state,
        request: {
          status: 1,
          error: null,
        }
      }
    }
    case MESSAGES_SUCCESS: {
      return {
        ...state,
        request: {
          status: 2,
          error: null,
        }
      }
    }
    case MESSAGES_FAILURE: {
      return {
        ...state,
        request: {
          status: 3,
          error: payload,
        }
      }
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messagesList: payload,
      }
    }
    default: return state;
  };
};
