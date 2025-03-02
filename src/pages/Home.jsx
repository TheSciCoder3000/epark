import { FaSearch } from "react-icons/fa";
import Bkg from "../assets/img/dash-bkg.png"
import VehicleSelection from "../components/VehicleSelection";
import ParkingHistory from "../components/ParkingHistory";
import "../assets/styles/css/Home.css"


export default function Home() {
  return (
    <div className="dashboard-cont">
      <div className="home-background">
        <div className="overlay"></div>
        <img src={Bkg} alt="" />
      </div>

      {/* Page Title */}
      <h1>Find Your Space</h1>

      {/* Search Bar */}
      <div className="search-cont">
        <input type="text" className="searchbar" />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Vehicle Type */}
      <div className="collection-cont">
        <h3 className="collection-header">Your Vehicle</h3>
        <VehicleSelection />
      </div>

      {/* Parking History */}
      <div className="collection-cont">
        <h3 className="collection-header">Parking History</h3>
        <ParkingHistory />
      </div>
    </div>
  );
}
