import { onValue, ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebase";

export const TOGGLE_SHOW_NAME = 'PROFILE::TOGGLE_SHOW_NAME';
export const CHANGE_NAME = "PROFILE::CHANGE_NAME";
export const SET_NAME = "PROFILE::SET_NAME";
export const SET_USER = "PROFILE::SET_USER";

export const toggleShowName = {
    type: TOGGLE_SHOW_NAME,
}

const setUser = (bool) => ({
    type: SET_USER,
    payload: bool,
});

const setName = (name) => ({
    type: SET_NAME,
    payload: name,
});

export const initName = () => async (dispatch) => {
    setTimeout(() => {
        const userDbRef = ref(db, `users/${auth.currentUser.uid}`);
        onValue(userDbRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(setName(data?.username || 'Default'));
        });
    }, 500);
};

export const changeNameFb = (name) => () => {
    const userDbRef = ref(db, `users/${auth.currentUser.uid}`);
    set(userDbRef, {
        username: name,
    });
};

export const initUser = () => (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            dispatch(setUser(true));
        }else dispatch(setUser(false));
    });
};