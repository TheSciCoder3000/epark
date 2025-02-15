import Nav from "../components/Nav";
import { useAuth } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
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
      <Nav />
    </div>
  );
}
