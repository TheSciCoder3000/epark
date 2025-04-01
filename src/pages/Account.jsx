import { useAuth } from "../components/contexts/Auth/hooks";
import { useNavigate } from "react-router-dom";
import Bkg from "../assets/img/dash-bkg.png"

export default function Account() {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logOutUser().then(() => navigate("/login"));
  };
  return (
    <div className="page">
      <div className="dashboard-cont">
        <div className="home-background">
          <div className="overlay"></div>
          <img src={Bkg} alt="" />
        </div>

        {/* Page Title */}
        <h1>Account</h1>

      </div>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
}
