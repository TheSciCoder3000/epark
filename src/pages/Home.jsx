import Bkg from "../assets/img/dash-bkg.png"
import "../assets/styles/css/Home.css"
import { useReservation } from "../components/contexts/Reservation/hooks";
import ReservationStatus from "../components/ReservationStatus";
import Reservation from "./User/Reservation";


export default function Home() {
  const { reservation, loading } = useReservation();
  console.log({ reservation, loading })

  if (loading) return <div className="user-loading-cont">
    <h1>Retrieving Reservation Data...</h1>
  </div>

  return (
    <div className="dashboard-cont">
      <div className="home-background">
        <div className="overlay"></div>
        <img src={Bkg} alt="" />
      </div>

      {/* Page Title */}
      <h1>Find Your Space</h1>
      {!reservation ?
        <Reservation />
        :
        <ReservationStatus />
      }
    </div>
  );
}
