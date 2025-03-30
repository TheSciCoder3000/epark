import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/useAuth";
import Bkg from "../../assets/img/dash-bkg.png";


function AdminSettings() {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logOutUser().then(() => navigate("/login"))
    }
    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>
            <div className="page">
                <h1>👤 Account Section</h1>
                <p>Manage your profile and settings.</p>
                <button onClick={logoutHandler}>Log Out</button>
            </div>
        </div>
    );
}

export default AdminSettings