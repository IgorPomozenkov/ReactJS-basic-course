import { ADD_MESSAGE, DELETE_MESSAGE } from "./actions";

const initialState = {
    messagesList: {
        'chat_1': [],
    },
};

export const messagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messagesList: {...state.messagesList, [payload.chatId]: [...(state.messagesList[payload.chatId] || []),
                    { id: payload.chatId, text: payload.text, author: payload.author },
                ]},
            }
        }
        case DELETE_MESSAGE: {
            const newChatMessages = state.messagesList[payload.chatId].filter(({ id }) => id !== payload.id);
            return {
                ...state,
                messagesList: {...state.messagesList, [payload.chatId]: newChatMessages},
            }
        }
        default: return state;
    }
}