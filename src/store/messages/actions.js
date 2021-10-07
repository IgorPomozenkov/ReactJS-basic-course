import { onValue, ref, remove, set } from "firebase/database";
import { db } from "../../services/firebase";

export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';
export const SET_MESSAGES = "MESSAGES::SET_MESSAGES";

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author
    }
});

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        id
    }
});

const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
});

let timeout;

export const initMessages = () => (dispatch) => {
    const messagesDbRef = ref(db, 'messages');
    onValue(messagesDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setMessages(data || {}));
    });
}

export const addMessageFb = (chatId, text, author, name) => () => {
    const newId = `message_${Date.now()}`;
    //const newIdMes = `message_${Date.now() + 1}`;
    const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
    set(messagesDbRef, {
        id: newId,
        text,
        author,
    });
    if(author === 'Human') {
        clearTimeout(timeout);
        const newId = `message_${Date.now()}`;
        timeout = setTimeout(() => {
            set(ref(db, `messages/${chatId}/${newId}`), {
                id: newId,
                text: `Author: ${name}`,
                author: 'Bot',
            });
        }, 1000)
    }
}

export const deleteMessageFb = (chatId, id) => () => {
    remove(ref(db, `messages/${chatId}/${id}`));
}