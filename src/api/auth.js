import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { createParkingOwner, createUserDb } from "./Firestore";

export const registerUser = async (email, password, userData) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(creds => {
            if (userData.role == "User") createUserDb(creds.user.uid, userData);
            else createParkingOwner(creds.user.uid, userData);
        });
}

export const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logOutUser = async () => {
    return signOut(auth);
}