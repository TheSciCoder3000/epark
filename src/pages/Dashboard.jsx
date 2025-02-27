import { useNavigate } from "react-router";
import { useAuth } from "../components/contexts/useAuth"

function Dashboard() {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logOutUser().then(() => navigate("/login"));
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logoutHandler}>Log out</button>
        </div>
    )
}

export default Dashboard