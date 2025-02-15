import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logOutUser = async () => {
    return signOut(auth);
}