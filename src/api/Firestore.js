import { setDoc, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export const createUserDb = async (userId, userData) => {
    return setDoc(doc(db, "users", userId), userData)
}

export const getUserDb = async (userId) => {
    return getDoc(doc(db, "users", userId))
}
