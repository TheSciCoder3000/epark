import { useAuth } from "../components/contexts/Auth/hooks";
import { useNavigate } from "react-router-dom";
import Bkg from "../assets/img/dash-bkg.png";
import "../assets/styles/css/Account.css";

export default function Account() {
    const { logOutUser, currentUser } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logOutUser().then(() => navigate("/login"));
    };
    return (
        <div className="account-cont">
            <div className="account-details">
                <div className="account-img-cont"></div>
                <h2>{currentUser.fullName}</h2>
                <h4>{currentUser.email}</h4>
            </div>

            <div className="account-controls">
                <button onClick={logoutHandler} className="logout-btn">
                    Log Out
                </button>
            </div>
        </div>
    );
}
