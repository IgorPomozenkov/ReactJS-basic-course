import { onValue, ref, remove, set, update } from "firebase/database";
import { db } from "../../services/firebase";

export const MESSAGES_PENDING = "MESSAGES::PENDING";
export const MESSAGES_SUCCESS = "MESSAGES::SUCCESS";
export const MESSAGES_FAILURE = "MESSAGES::FAILURE";
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';
export const SET_MESSAGES = "MESSAGES::SET_MESSAGES";

const pending = () => ({
  type: MESSAGES_PENDING,
});

const success = () => ({
  type: MESSAGES_SUCCESS,
});

// const failure = (mess) => ({
//   type: MESSAGES_FAILURE,
//   payload: mess,
// });

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const initMessages = () => (dispatch) => {
  dispatch(pending());
  const msgDbRef = ref(db, 'messages');
  onValue(msgDbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setMessages(data || {}));
    dispatch(success());
  });
};

export const addMessage = (chatId, data) => (dispatch) => {
  dispatch(pending());
  const msgDbRef = ref(db, `messages/${chatId}/${data.id}`);
  set(msgDbRef, data);
};

export const changeMessage = (chatId, id, data) => (dispatch) => {
  dispatch(pending());
  const msgDbRef = ref(db, `messages/${chatId}/${id}`);
  update(msgDbRef, data);
};

export const deleteMessage = (chatId, id) => (dispatch) => {
  dispatch(pending());
  remove(ref(db, `messages/${chatId}/${id}`));
};
