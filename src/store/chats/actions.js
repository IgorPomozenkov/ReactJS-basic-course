import { onValue, ref, set, remove } from "firebase/database";
import { db } from "../../services/firebase";

export const ADD_CHAT = "CHATS::ADD_CHAT";
export const DELETE_CHAT = "CHATS::DELETE_CHAT";
export const SET_CHATS = "CHATS::SET_CHATS";

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: name,
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: id,
});

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats,
});

export const initChats = () => (dispatch) => {
    const chatsDbRef = ref(db, 'chats');
    onValue(chatsDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setChats(Object.values(data || {})));
    });
};

export const addChatFb = (name) => () => {
    const newId = `chat_${Date.now()}`;
    const chatsDbRef = ref(db, `chats/${newId}`);
    set(chatsDbRef, {
        id: newId,
        name,
    });
}

export const deleteChatFb = (id) => () => {
    remove(ref(db, `chats/${id}`));
    remove(ref(db, `messages/${id}`));
}