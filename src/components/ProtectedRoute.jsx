import { Navigate, Outlet } from 'react-router'
import { useAuth } from './contexts/useAuth'
import Nav from './Nav';

function ProtectedRoute() {
    const { currentUser, loading } = useAuth();

    if (!loading) {
        if (currentUser) return <>
            <Outlet />
            <Nav />
        </>
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute