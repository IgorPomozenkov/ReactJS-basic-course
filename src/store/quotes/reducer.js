import { REQUEST_STATUS } from "../../utils/constants";
import { GET_QUOTES_FAILURE, GET_QUOTES_PENDING, GET_QUOTES_SUCCESS } from "./actions";

const initialState = {
    list: [],
    request: {
        status: REQUEST_STATUS.IDLE,
        error: null,
    }
};

export const quotesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_QUOTES_PENDING: {
            return {
                ...state,
                list: [],
                request: {
                    status: REQUEST_STATUS.PENDING,
                    error: null,
                }
            }
        }
        case GET_QUOTES_SUCCESS: {
            return {
                ...state,
                list: payload.data,
                request: {
                    status: REQUEST_STATUS.SUCCESS,
                    error: null,
                }
            }
        }
        case GET_QUOTES_FAILURE: {
            return {
                ...state,
                list: [],
                request: {
                    status: REQUEST_STATUS.FAILURE,
                    error: payload,
                }
            }
        }
        default: return state;
    }
}