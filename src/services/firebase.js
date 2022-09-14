// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MzTT5kXQA6wJyxo548-SToCH_JciKlM",
  authDomain: "chats-app-c23da.firebaseapp.com",
  databaseURL: "https://chats-app-c23da-default-rtdb.firebaseio.com",
  projectId: "chats-app-c23da",
  storageBucket: "chats-app-c23da.appspot.com",
  messagingSenderId: "545442078272",
  appId: "1:545442078272:web:948a7918d7ab49fc2ac9a5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const login = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
}

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
}

export const logOut = async () => {
  await signOut(auth);
}
