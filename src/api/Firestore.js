import { setDoc, doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "./firebase"

export const createUserDb = async (userId, userData) => {
    return setDoc(doc(db, "user", userId), userData)
}

export const createParkingOwner = async (userId, userData) => setDoc(doc(db, "owner", userId), userData);

export const getUserDb = async (userId) => {
    return getDoc(doc(db, "user", userId)).then(ds => ds.data())
}

export const getOwnerDb = async (userId) => getDoc(doc(db, "owner", userId)).then(ds => ds.data());

export const getParkingLots = async () => {
    return getDocs(collection(db, "owner"))
        .then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

export const createReservation = async (parkingSpot, userId, duration) => {
    const { id, ...spotData } = parkingSpot;
    await setDoc(doc(db, "lots", id), { ...spotData, userId, duration })
}

export const createParkingSpots = async (userId, parkingInfo) => {
    return await updateDoc(doc(db, "owner", userId), {
        lots: arrayUnion(parkingInfo)
    })
}