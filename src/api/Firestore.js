import {
    setDoc,
    doc,
    getDoc,
    collection,
    getDocs,
    updateDoc,
    arrayUnion,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";
import { getDecimalHours } from "../utils/Math";

export const createUserDb = async (userId, userData) => {
    return setDoc(doc(db, "user", userId), userData);
};

export const createParkingOwner = async (userId, userData) =>
    setDoc(doc(db, "owner", userId), userData);

export const getUserDb = async (userId) =>
    getDoc(doc(db, "user", userId)).then((ds) => ds.data());

export const getOwnerDb = async (userId) =>
    getDoc(doc(db, "owner", userId)).then(async (ds) => {
        let ownerData = ds.data();

        console.log({ ownerData });
        ownerData.lots = [];

        for (const lotRef of ownerData.lotsRef) {
            const lotSnap = await getDoc(lotRef);
            ownerData.lots.push({ id: lotSnap.id, ...lotSnap.data() });
        }

        return ownerData;
    });

export const getParkingLots = async () => {
    return getDocs(collection(db, "owner"))
        .then((querySnapshot) =>
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
        .then(async (data) => {
            for (const owner of data) {
                owner.lots = [];

                for (const lotRef of owner.lotsRef) {
                    const lotData = await getDoc(lotRef);
                    owner.lots.push(lotData.data());
                }
            }

            return data;
        });
};

export const addReservation = async (
    userId,
    parkingLotId,
    parkingSpotId,
    StartTime,
    EndTime,
    price
) => {
    return await addDoc(collection(db, "reservations"), {
        userRef: doc(db, "user", userId),
        parkingLotRef: doc(db, "owner", parkingLotId),
        parkingSpotId,
        StartTime,
        EndTime,
        status: "reserved",
        total: getDecimalHours(StartTime, EndTime) * price,
        price,
    })
        .then((ref) => getDoc(doc(db, "reservations", ref.id)))
        .then((snapShot) => ({ id: snapShot.id, ...snapShot.data() }))
        .then(async (documentData) => {
            if (documentData) {
                const ref = documentData.parkingLotRef;
                const ownerData = await getDoc(ref).then((snapShot) =>
                    snapShot.data()
                );
                return {
                    ...documentData,
                    parkingLot: ownerData,
                };
            }
            return documentData;
        });
};

export const updateReservationStatus = async (reservationId, status) => {
    return await updateDoc(doc(db, "reservations", reservationId), {
        status,
    });
};

export const onUserHistoryUpdate = (userId, setHistory) => {
    return onSnapshot(doc(db, "user", userId), async (snapshot) => {
        let historyData = snapshot.data().history;
        if (!historyData) setHistory([]);
        else {
            console.log({ historyData });
            historyData = await Promise.all(
                historyData.map(async (item) => {
                    const parkingData = await getDoc(item.parkingLotRef).then(
                        (docu) => docu.data()
                    );
                    return { ...item, ...parkingData };
                })
            );
            setHistory(historyData);
        }
    });
};
export const onAdminHistoryUpdate = (userId, setHistory) => {
    return onSnapshot(doc(db, "owner", userId), (snapshot) =>
        setHistory(snapshot.data().history ? [...snapshot.data().history] : [])
    );
};

export const onUserReservationUpdates = (userId, setState) => {
    const reservationQuery = query(
        collection(db, "reservations"),
        where("userRef", "==", doc(db, "user", userId))
    );
    return onSnapshot(reservationQuery, (snapshot) => {
        if (snapshot.docChanges().length == 0) setState(null);
        else
            snapshot.docChanges().forEach(async (change) => {
                const ref = change.doc.data().parkingLotRef;
                const ownerData = await getDoc(ref).then((snapShot) =>
                    snapShot.data()
                );
                const userData = await getDoc(change.doc.data().userRef).then(
                    (snapshot) => snapshot.data()
                );
                setState(change.type, {
                    ...change.doc.data(),
                    id: change.doc.id,
                    parkingLot: ownerData,
                    user: userData,
                });
            });
    });
};

export const onOwnerReservationUpdates = (userId, setState) => {
    const reservationQuery = query(
        collection(db, "reservations"),
        where("parkingLotRef", "==", doc(db, "owner", userId))
    );
    return onSnapshot(reservationQuery, async (snapshot) => {
        if (snapshot.docChanges().length == 0) setState(null);
        else {
            let reservations = [];

            for (const doc of snapshot.docs) {
                const parkingSnapshot = await getDoc(doc.data().parkingLotRef);
                const userSnapshot = await getDoc(doc.data().userRef);
                reservations.push({
                    id: doc.id,
                    ...doc.data(),
                    user: userSnapshot.data(),
                    parkingLot: parkingSnapshot.data(),
                });
            }
            setState(reservations);
        }
    });
};

export const completeReservation = async (reservationId) => {
    const reservationData = await getDoc(
        doc(db, "reservations", reservationId)
    ).then((snapShot) => ({ id: snapShot.id, ...snapShot.data() }));

    await updateDoc(doc(db, "user", reservationData.userRef.id), {
        history: arrayUnion(reservationData),
    });

    await updateDoc(doc(db, "owner", reservationData.parkingLotRef.id), {
        history: arrayUnion(reservationData),
    });

    await deleteDoc(doc(db, "reservations", reservationId)).then(console.log);

    return reservationData.id;
};

export const createParkingSpots = async (userId, parkingInfo) => {
    const lotRef = await addDoc(collection(db, "lots"), {
        ownerRef: doc(db, "owner", userId),
        ...parkingInfo,
    });

    return await updateDoc(doc(db, "owner", userId), {
        lotsRef: arrayUnion(lotRef),
    });
};

export const deleteParkingSpot = async (userId, parkingid) => {
    console.log({ parkingid });
    const lotRef = doc(db, "lots", parkingid);

    await deleteDoc(lotRef);

    return updateDoc(doc(db, "owner", userId), {
        lotsRef: arrayRemove(lotRef),
    });
};
