import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Bkg from "../../assets/img/dash-bkg.png";
import AvailableSlot from "../../components/AvailableSlots";
import ReservedSlot from "../../components/ReservedSlots";
import RevenueCard from "../../components/RevenueCard";
import ParkingLog from "../../components/ParkingLog";
import "../../assets/styles/css/Home.css";
import "../../assets/styles/css/DashboardAdmin.css";
import "../../assets/styles/css/RevenueCard.css";


const DashboardAdmin = () => {
    // Sample Data (Replace with API data in the future)
    const [totalSlots, setTotalSlots] = useState(50); // Example: 50 total parking slots
    const [parkedCars, setParkedCars] = useState(20); // Example: 20 cars are parked
    const [reservedSlots, setReservedSlots] = useState(10); // Example: 10 slots are reserved
    const [revenue, setRevenue] = useState(500); // Example: $1000 revenue
    const [avgMonthlyRevenue, setAvgMonthlyRevenue] = useState(12000); // Example: $12000 average monthly revenue
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Sample Parking Log Data
    const [parkingLog, setParkingLog] = useState([
        { client: "John Doe", plate: "XYZ 123", ParkingSpot: 1, reservedHours: 4, hoursLeft: 2 },
        { client: "Jane Smith", plate: "ABC 789", ParkingSpot: 4, reservedHours: 3, hoursLeft: 1 },
        { client: "Alice Brown", plate: "DEF 456", ParkingSpot: 7, reservedHours: 5, hoursLeft: 3 },
    ]);

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            {/* Page Title */}
            <h1 style={{ marginTop: "20px", marginBottom: "20px", fontSize: "2rem" }}>Admin Dashboard</h1>

             {/* Date & Time Display */}
            <div className="datetime-container">
                <p style={{ fontSize: "1.2rem", color: "white" }}>{dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}</p>
            </div>

            {/* Card Section */}
            <div className="card-row" style={{ marginTop: "20px" }}> {/* Added flex container */}
                <AvailableSlot totalSlots={totalSlots} parkedCars={parkedCars} reservedSlots={reservedSlots} />
                <ReservedSlot reservedSlots={reservedSlots} parkedCars={parkedCars} />
            </div>
            <div className="card-row" style={{ marginTop: "20px" }}> {/* Added flex container */}
            <RevenueCard title="Today's Revenue" revenue={revenue} />
            <RevenueCard title="Avg Monthly Revenue" revenue={avgMonthlyRevenue} />
            </div>

            <h2 style={{ marginTop: "20px" }}>Current Parking Status</h2>

            <ParkingLog logs={parkingLog} />
        </div>
    );
};

export default DashboardAdmin;