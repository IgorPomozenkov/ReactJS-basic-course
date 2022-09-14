import { onValue, ref, set, remove } from "firebase/database";
import { db } from "../../services/firebase";

export const CHATS_PENDING = "CHATS::PENDING";
export const CHATS_SUCCESS = "CHATS::SUCCESS";
export const CHATS_FAILURE = "CHATS::FAILURE";
export const ADD_CHAT = "CHATS::ADD_CHAT";
export const DELETE_CHAT = "CHATS::DELETE_CHAT";
export const SET_CHATS = "CHATS::SET_CHATS";

const pending = () => ({
  type: CHATS_PENDING,
});

const success = () => ({
  type: CHATS_SUCCESS,
});

// const failure = (mess) => ({
//   type: CHATS_FAILURE,
//   payload: mess,
// });

const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
});

export const initChats = () => (dispatch) => {
  dispatch(pending());
  const chatsDbRef = ref(db, 'chats');
  onValue(chatsDbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setChats(Object.values(data || {})));
    dispatch(success());
  });
};

export const addChat = (data) => (dispatch) => {
  dispatch(pending());
  const chatsDbRef = ref(db, `chats/${data.id}`);
  set(chatsDbRef, data);
};

export const deleteChat = (id) => (dispatch) => {
  dispatch(pending());
  remove(ref(db, `chats/${id}`));
  remove(ref(db, `messages/${id}`));
};
