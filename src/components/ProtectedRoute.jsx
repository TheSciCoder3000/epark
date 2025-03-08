import { Navigate, Outlet } from 'react-router'
import { useAuth } from './contexts/useAuth'
import Nav from './Nav';

function ProtectedRoute() {
    const { currentUser, loading } = useAuth();
    console.log("testing:");
    console.log({ currentUser, loading })

    if (!loading) {
        if (currentUser) return <>
            <Outlet />
            <Nav />
        </>
        return <Navigate to="/login" />
    }

    return <div className='loading-cont'>
        <h1>Loading ...</h1>
    </div>
}

export default ProtectedRoute