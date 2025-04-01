import Bkg from "../assets/img/dash-bkg.png"
import "../assets/styles/css/Home.css"
import { useAuth } from "../components/contexts/useAuth";
import ReservationStatus from "../components/ReservationStatus";
import Reservation from "./User/Reservation";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  console.log("home")

  return (
    <div className="dashboard-cont">
      <div className="home-background">
        <div className="overlay"></div>
        <img src={Bkg} alt="" />
      </div>
      {/* Transaction Button */}
      
      {/* Page Title */}
      <h1>Find Your Space</h1>
      {!currentUser.activeReservation ? <Reservation /> : <ReservationStatus reservation={currentUser.activeReservation} />}
       <button onClick={() => navigate("/Transaction")} className="transact-button">Proceed to Payments</button>
    </div>
  );
}
