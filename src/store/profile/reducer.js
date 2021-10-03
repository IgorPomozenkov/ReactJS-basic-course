import { SET_NAME, SET_USER, TOGGLE_SHOW_NAME } from './actions';

const initialState = {
    showName: false,
    authed: false,
    name: 'Default'
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName,
            }
        }
        case SET_NAME: {
            return {
                ...state,
                name: action.payload,
            }
        }
        case SET_USER: {
            return {
                ...state,
                authed: action.payload,
            }
        }
        default: return state;
    }
}