import { FaSearch } from "react-icons/fa";
import Bkg from "../assets/img/dash-bkg.png"
import VehicleSelection from "../components/VehicleSelection";
import ParkingLotsList from "../components/ParkingLotsList";
import "../assets/styles/css/Home.css"
import { useState } from "react";


export default function Home() {
  const [searchinput, setSearchinput] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);

  const MakeReservationHandler = () => {
    console.log({ selectedParkingLot, selectedVehicle })
  }

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
        <input type="text" className="searchbar" placeholder="Search Parking Lots" onChange={e => setSearchinput(e.target.value)} />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Vehicle Type */}
      <div className="collection-cont">
        <h3 className="collection-header">Your Vehicle</h3>
        <VehicleSelection onSelect={setSelectedVehicle} />
      </div>

      {/* Parking History */}
      <div className="collection-cont">
        <h3 className="collection-header">Parking Lots</h3>
        <ParkingLotsList filter={searchinput} onSelect={setSelectedParkingLot} />
      </div>

      <button onClick={MakeReservationHandler} className="transaction-btn" disabled={!selectedParkingLot || !selectedVehicle}>
        Reserve Now
      </button>
    </div>
  );
}
