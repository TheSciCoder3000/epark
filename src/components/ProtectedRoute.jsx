import { Navigate, Outlet } from 'react-router'
import { useAuth } from './contexts/AuthContext'

function ProtectedRoute() {
    const { currentUser, loading } = useAuth();

    if (!loading) {
        if (currentUser) return <Outlet />
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute