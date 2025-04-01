import { setDoc, doc, getDoc, collection, getDocs, updateDoc, arrayUnion, addDoc, query, where } from "firebase/firestore"
import { db } from "./firebase"

export const createUserDb = async (userId, userData) => {
    return setDoc(doc(db, "user", userId), userData)
}

export const createParkingOwner = async (userId, userData) => setDoc(doc(db, "owner", userId), userData);

export const getUserDb = async (userId) => {
    return getDoc(doc(db, "user", userId)).then(ds => ds.data())
}

export const getOwnerDb = async (userId) => getDoc(doc(db, "owner", userId)).then(ds => ds.data())

export const getParkingLots = async () => {
    return getDocs(collection(db, "owner"))
        .then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

export const createReservation = async (userId, parkingLotId, parkingSpotId, StartTime, EndTime) => {
    return await addDoc(collection(db, "reservations"), { userId, parkingLotId, parkingSpotId, StartTime, EndTime, status: "reserved" })
        .then(ref => getDoc(doc(db, "reservations", ref.id)))
        .then(snapShot => ({ id: snapShot.id, ...snapShot.data() }))
        .then(async (documentData) => {
            if (documentData) {
                const ref = doc(db, "owner", documentData.parkingLotId);
                const ownerData = await getDoc(ref).then(snapShot => snapShot.data());
                return {
                    ...documentData,
                    parkingLot: ownerData
                }
            }
            return documentData
        })
}

export const updateReservationStatus = async (reservationId) => {
    return await updateDoc(doc(db, "reservations", reservationId), {
        status: "occupied"
    })
}

export const getReservationFromUser = async (userId) => {
    const ref = collection(db, "reservations");
    const q = query(ref, where("userId", "==", userId));
    return await getDocs(q).then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(doc => doc !== undefined))
        .then(async (documentData) => {
            if (documentData) {
                const ref = doc(db, "owner", documentData.parkingLotId);
                const ownerData = await getDoc(ref).then(snapShot => snapShot.data());
                return {
                    ...documentData,
                    parkingLot: ownerData
                }
            }
            return documentData
        })
}

export const createParkingSpots = async (userId, parkingInfo) => {
    return await updateDoc(doc(db, "owner", userId), {
        lots: arrayUnion(parkingInfo)
    })
}