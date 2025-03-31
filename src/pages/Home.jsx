import Bkg from "../assets/img/dash-bkg.png"
import "../assets/styles/css/Home.css"
import { useAuth } from "../components/contexts/useAuth";
import Reservation from "./User/Reservation";


export default function Home() {
  const { currentUser } = useAuth();



  return (
    <div className="dashboard-cont">
      <div className="home-background">
        <div className="overlay"></div>
        <img src={Bkg} alt="" />
      </div>

      {/* Page Title */}
      <h1>Find Your Space</h1>

      {!currentUser.activeReservationId ? <Reservation /> : <h1>Reservation created</h1>}
    </div>
  );
}
