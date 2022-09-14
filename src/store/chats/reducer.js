import { CHATS_PENDING, CHATS_SUCCESS, CHATS_FAILURE, SET_CHATS } from "./actions";

const initialState = {
  chatsList: [],
  request: {
    status: 0,
    error: null,
  },
}

export const chatsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHATS_PENDING: {
      return {
        ...state,
        request: {
          status: 1,
          error: null,
        }
      }
    }
    case CHATS_SUCCESS: {
      return {
        ...state,
        request: {
          status: 2,
          error: null,
        }
      }
    }
    case CHATS_FAILURE: {
      return {
        ...state,
        request: {
          status: 3,
          error: payload,
        }
      }
    }
    case SET_CHATS: {
      return {
        ...state,
        chatsList: payload,
      }
    }
    default: return state;
  };
};
