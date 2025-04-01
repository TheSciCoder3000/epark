

import { ReservationContext } from './hooks'
import { useAuth } from '../Auth/hooks'
import { useEffect, useState } from 'react';
import { addReservation, onUserHistoryUpdate, onAdminHistoryUpdate, onUserReservationUpdates, updateReservationStatus, onOwnerReservationUpdates } from '../../../api/Firestore';

function ReservationProvider({ children }) {
    const { currentUser, loading } = useAuth();
    const [reservationLoading, setLoading] = useState(true);
    const [reservation, setReservation] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (loading || !currentUser) return;

        console.log("adding listeners")
        const reserve_unsub = currentUser.role == "User" ? onUserReservationUpdates(currentUser.uid, (type, doc) => {
            if (type == "removed") setReservation(null);
            else setReservation(doc)
            setLoading(false);
        }) :
            onOwnerReservationUpdates(currentUser.uid, (doc) => {
                setReservation(doc)
                setLoading(false);
            });

        const history_unsub = currentUser.role == "User" ?
            onUserHistoryUpdate(currentUser.uid, setHistory) :
            onAdminHistoryUpdate(currentUser.uid, setHistory);

        return () => {
            reserve_unsub();
            history_unsub();
        }
    }, [currentUser, loading])


    const createReservation = async (parkingId, parkingSpot, start, end, price) => {
        addReservation(currentUser.uid, parkingId, parkingSpot, start, end, price);
    }

    return (
        <ReservationContext.Provider value={{
            reservation,
            history,
            createReservation,
            updateReservationStatus,
            loading: reservationLoading
        }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationProvider