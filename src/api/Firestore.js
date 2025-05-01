import { setDoc, doc, getDoc, collection, getDocs, updateDoc, arrayUnion, addDoc, query, where, onSnapshot, deleteDoc, arrayRemove } from "firebase/firestore"
import { db } from "./firebase"

export const createUserDb = async (userId, userData) => {
    return setDoc(doc(db, "user", userId), userData)
}

export const createParkingOwner = async (userId, userData) => setDoc(doc(db, "owner", userId), userData);

export const getUserDb = async (userId) => getDoc(doc(db, "user", userId)).then(ds => ds.data());

export const getOwnerDb = async (userId) => getDoc(doc(db, "owner", userId)).then(async (ds) => {
    let ownerData = ds.data();

    console.log({ownerData})
    ownerData.lots = [];

    for (const lotRef of ownerData.lotsRef) {
        const lotSnap = await getDoc(lotRef);
        ownerData.lots.push({id: lotSnap.id, ...lotSnap.data()});
    }

    return ownerData;
});

export const getParkingLots = async () => {
    return getDocs(collection(db, "owner"))
        .then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        .then(async (data) => {
            console.log(data)
            for (const owner of data) {
                owner.lots = [];

                for (const lotRef of owner.lotsRef) {
                    const lotData = await getDoc(lotRef);
                    owner.lots.push(lotData.data());
                }
            }

            return data;
        })
}

export const addReservation = async (userId, parkingLotId, parkingSpotId, StartTime, EndTime, price) => {
    return await addDoc(collection(db, "reservations"), { userId, parkingLotId, parkingSpotId, StartTime, EndTime, status: "reserved", price })
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

export const updateReservationStatus = async (reservationId, status) => {
    return await updateDoc(doc(db, "reservations", reservationId), {
        status
    })
}

export const onUserHistoryUpdate = (userId, setHistory) => {
    return onSnapshot(doc(db, "user", userId), async (snapshot) => {
        let historyData = snapshot.data().history;
        if (!historyData) setHistory([]);
        else {
            historyData = await Promise.all(historyData.map(async (item) => {
                const parkingData = await getDoc(doc(db, "owner", item.parkingLotId)).then(docu => docu.data());
                return { ...item, ...parkingData }
            }))
            setHistory(historyData)
        }
    })
}
export const onAdminHistoryUpdate = (userId, setHistory) => {
    return onSnapshot(doc(db, "owner", userId), snapshot => setHistory(snapshot.data().history ? [...snapshot.data().history] : []))
}

/**
 * Used for getting Reservation data from the Reservation document using user id
 * @param {string} userId 
 * @returns Reservation Data
 */
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

export const onUserReservationUpdates = (userId, setState) => {
    const reservationQuery = query(collection(db, "reservations"), where("userId", "==", userId))
    return onSnapshot(reservationQuery, (snapshot) => {
        if (snapshot.docChanges().length == 0) setState(null);
        else snapshot.docChanges().forEach(async (change) => {
            const ref = doc(db, "owner", change.doc.data().parkingLotId);
            const ownerData = await getDoc(ref).then(snapShot => snapShot.data());
            setState(change.type, { ...change.doc.data(), id: change.doc.id, parkingLot: ownerData });
        })
    });
}

export const onOwnerReservationUpdates = (userId, setState) => {
    const reservationQuery = query(collection(db, "reservations"), where("parkingLotId", "==", userId))
    return onSnapshot(reservationQuery, (snapshot) => {
        if (snapshot.docChanges().length == 0) setState(null);
        else setState(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
}

export const onReservationUpdates = async (reservationId, getDocData) => {
    return onSnapshot(doc(db, "reservations", reservationId), async (docSnapshot) => {
        const reservationData = docSnapshot.data();

        console.log({ changes: docSnapshot.exists() })

        if (reservationData) {
            const ref = doc(db, "owner", reservationData.parkingLotId);
            const ownerData = await getDoc(ref).then(snapShot => snapShot.data());
            getDocData({
                id: docSnapshot.id,
                ...reservationData,
                parkingLot: ownerData
            })
        } else {
            getDocData(null)
        }
    })
}

export const completeReservation = async (reservationId) => {
    const reservationData = await getDoc(doc(db, "reservations", reservationId))
        .then(snapShot => ({ id: snapShot.id, ...snapShot.data() }));

    await updateDoc(doc(db, "user", reservationData.userId), {
        history: arrayUnion(reservationData)
    });

    await updateDoc(doc(db, "owner", reservationData.parkingLotId), {
        history: arrayUnion(reservationData)
    });

    await deleteDoc(doc(db, "reservations", reservationId))
        .then(console.log);

    return reservationData.id
}

export const createParkingSpots = async (userId, parkingInfo) => {
    const lotRef = await addDoc(
        collection(db, "lots"),
        {
            ownerRef: doc(db, "owner", userId),
            ...parkingInfo
        }
    )

    return await updateDoc(doc(db, "owner", userId), {
        lotsRef: arrayUnion(lotRef)
    })
}

export const deleteParkingSpot = async (userId, parkingid) => {
    console.log({parkingid})
    const lotRef = doc(db, "lots", parkingid);

    await deleteDoc(lotRef);

    return updateDoc(doc(db, "owner", userId), {
        lotsRef: arrayRemove(lotRef)
    })
}