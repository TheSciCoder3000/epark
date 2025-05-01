import { Navigate, Outlet } from 'react-router'
import { useAuth } from './contexts/Auth/hooks'
import Nav from './Nav';
import TopBar from './TopBar';

function ProtectedRoute({ role }) {
    const { currentUser, loading } = useAuth();

    if (!loading) {
        if (currentUser) {
            if (currentUser.role != role) return <Navigate to="/admin-dashboard" />
            return <>
                <TopBar accountPath={role == "Admin" ? "/admin-settings" : "/account"} />
                <Outlet />
                <Nav />
            </>
        }
        return <Navigate to="/login" />
    }

    return <div className='loading-cont'>
        <h1>Loading ...</h1>
    </div>
}

export default ProtectedRoute