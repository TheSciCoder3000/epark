import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Bkg from "../../assets/img/dash-bkg.png";
import VehicleSelection from "../../components/VehicleSelection";
import ParkingHistory from "../../components/ParkingHistory";
import AvailableSlot from "../../components/AvailableSlots";
import ReservedSlot from "../../components/ReservedSlots";
import "../../assets/styles/css/Home.css";
import "../../assets/styles/css/DashboardAdmin.css";

const DashboardAdmin = () => {
    // Sample Data (Replace with API data in the future)
    const [totalSlots, setTotalSlots] = useState(50); // Example: 50 total parking slots
    const [parkedCars, setParkedCars] = useState(20); // Example: 20 cars are parked
    const [reservedSlots, setReservedSlots] = useState(10); // Example: 10 slots are reserved

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            {/* Page Title */}
            <h1>Admin Dashboard</h1>

            {/* Card Section */}
            <div className="card-row"> {/* Added flex container */}
                <AvailableSlot totalSlots={totalSlots} parkedCars={parkedCars} reservedSlots={reservedSlots} />
                <ReservedSlot reservedSlots={reservedSlots} parkedCars={parkedCars} />
            </div>
        </div>
    );
};

export default DashboardAdmin;