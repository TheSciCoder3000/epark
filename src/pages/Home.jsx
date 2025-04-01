import Bkg from "../assets/img/dash-bkg.png"
import "../assets/styles/css/Home.css"
import { useAuth } from "../components/contexts/useAuth";
import ReservationStatus from "../components/ReservationStatus";
import Reservation from "./User/Reservation";


export default function Home() {
  const { currentUser, updateReservationStatus } = useAuth();



  return (
    <div className="dashboard-cont">
      <div className="home-background">
        <div className="overlay"></div>
        <img src={Bkg} alt="" />
      </div>

      {/* Page Title */}
      <h1>Find Your Space</h1>

      {!currentUser.activeReservation ? <Reservation /> : <ReservationStatus updateReservation={updateReservationStatus} reservation={currentUser.activeReservation} />}
    </div>
  );
}
