import { onValue, ref, set, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, login, logOut, signUp } from "../../services/firebase";
import User from "../../utils/constants";

export const PROFILE_PENDING = "PROFILE::PENDING";
export const PROFILE_SUCCESS = "PROFILE::SUCCESS";
export const PROFILE_FAILURE = "PROFILE::FAILURE";
export const SET_USER = "PROFILE::SET_USER";
export const SET_USER_DATA = "PROFILE::SET_USER_DATA";
export const CHANGE_NAME = "PROFILE::CHANGE_NAME";

const pending = () => ({
  type: PROFILE_PENDING,
});

const success = () => ({
  type: PROFILE_SUCCESS,
});

const failure = (mess) => ({
  type: PROFILE_FAILURE,
  payload: mess,
});

const setUser = (bool) => ({
  type: SET_USER,
  payload: bool,
});

const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
});

export const userRegister = (email, pass) => async (dispatch) => {
  dispatch(pending());
  try {
    await signUp(email, pass);
    const id = auth.currentUser.uid;
    const userDbRef = ref(db, `users/${id}`);
    set(userDbRef, {
      id,
      role: 'user',
      name: 'User_' + Date.now().toString().slice(9),
    });
    dispatch(initUser());
    //dispatch(success());
  } catch (e) {
    console.log(e);
    dispatch(failure(e.message.slice(10)));
  }
};

export const userLogin = (email, pass) => async (dispatch) => {
  dispatch(pending());
  try {
    await login(email, pass);
    dispatch(initUser());
    //dispatch(success());
  } catch (e) {
    console.log(e);
    dispatch(failure(e.message.slice(10)));
  }
};

export const initUser = () => (dispatch) => {
  dispatch(pending());
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(true));
      const userDbRef = ref(db, `users/${user.uid}`);
      onValue(userDbRef, (snapshot) => {
        const data = snapshot.val();
        const newUser = new User(data.id, data.role, data.name, user.email);
        dispatch(setUserData(newUser));
        dispatch(success());
      });
    } else {
      dispatch(setUser(false));
      dispatch(success());
    }
  });
};

export const changeUserData = (data) => (dispatch) => {
  dispatch(pending());
  const id = auth.currentUser.uid;
  const userDbRef = ref(db, `users/${id}`);
  update(userDbRef, data);
};

export const userLogout = () => async () => {
  try {
    await logOut();
  } catch (e) {
    console.log(e);
  }
};
