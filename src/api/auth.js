import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { createUserDb } from "./Firestore";

export const registerUser = async (email, vehicle, plate, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(creds => {
            console.log(creds);
            createUserDb(creds.user.uid, { email, vehicle, plate});
        });
}

export const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logOutUser = async () => {
    return signOut(auth);
}