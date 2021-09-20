import { CHANGE_NAME, TOGGLE_SHOW_NAME } from './actions'

const initialState = {
    showName: false,
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
        case CHANGE_NAME: {
            return {
                ...state,
                name: action.payload,
            }
        }
        default: return state;
    }
}