import { DELETE_CHAT } from "../chats/actions";
import { ADD_MESSAGE, DELETE_MESSAGE } from "./actions";

const initialState = {
    messagesList: {
        'chat_1': [],
    },
};

export const messagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            const currentList = state.messagesList[payload.chatId] || [];
            return {
                ...state,
                messagesList: {...state.messagesList, [payload.chatId]: [...currentList,
                    { id: `${payload.chatId}_${currentList.length}`, text: payload.text, author: payload.author },
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
        case DELETE_CHAT: {
            const newMessages = {...state.messagesList};
            delete newMessages[payload];
            return {
                ...state,
                messagesList: newMessages,
            }
        }
        default: return state;
    }
}