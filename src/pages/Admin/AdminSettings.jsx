import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/useAuth";


function AdminSettings() {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logOutUser().then(() => navigate("/login"))
    }
    return (
        <div className="page">
            <h1>👤 Account Section</h1>
            <p>Manage your profile and settings.</p>
            <button onClick={logoutHandler}>Log Out</button>
        </div>
    );
}

export default AdminSettings