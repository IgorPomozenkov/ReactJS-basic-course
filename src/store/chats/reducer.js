import { ADD_CHAT, DELETE_CHAT, SET_CHATS } from "./actions";

const initialState = {
    chatsList: [],
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
        case SET_CHATS: {
            return {
                ...state,
                chatsList: action.payload,
            }
        }
        default: return state;
    }
}