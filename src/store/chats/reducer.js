import { ADD_CHAT, DELETE_CHAT } from "./actions";

const initialState = {
    chatsList: [
        { name: 'Chat 1', id: 'chat_1' },
    ],
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                ...state,
                chatsList: [...state.chatsList, { name: action.payload, id: `chat_${state.chatsList.length + 1}` }],
            }
        }
        case DELETE_CHAT: {
            const newChats = state.chatsList.filter(({ id }) => id !== action.payload);
            return {
                ...state,
                chatsList: newChats,
            }
        }
        default: return state;
    }
}