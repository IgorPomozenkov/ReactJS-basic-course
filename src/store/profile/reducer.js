import { TOGGLE_SHOW_NAME } from './actions'

const initialState = {
    showName: false,
    name: 'Igor'
}

// const changeName = (name) => {
//     if(name === 'Igor') {
//         return 'Din'
//     }else return 'Igor'
// }

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName,
                name: state.name,
            }
        }
        default: return state;
    }
}