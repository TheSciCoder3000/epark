import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../api/firebase";
import { loginUser, logOutUser, registerUser } from "../../api/auth";
import { AuthContext } from "./useAuth";
import { getOwnerDb, getReservationFromUser, getUserDb } from "../../api/Firestore";

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const initializeUser = async (user) => {
        setLoading(true);
        if (user) {
            let userData = await getUserDb(user.uid);
            if (!userData) userData = await getOwnerDb(user.uid);

            if (userData.role == "User") {
                const reservation = await getReservationFromUser(user.uid);
                userData = { ...userData, activeReservation: reservation }
            }

            setCurrentUser({ ...userData, uid: user.uid });
            setLoggedIn(true);
        } else {
            setCurrentUser(null);
            setLoggedIn(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, initializeUser);
        return unsub;
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            loggedIn,
            loading,
            registerUser,
            loginUser,
            logOutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}