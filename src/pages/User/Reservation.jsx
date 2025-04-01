import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import VehicleSelection from "../../components/VehicleSelection";
import ParkingLotsList from "../../components/ParkingLotsList";
import ParkingSpotList from "../../components/ParkingSpotList";
import ParkingTimeSlot from "../../components/ParkingTimeSlot";
import { useAuth } from "../../components/contexts/useAuth";

function Reservation({ setReservation }) {
    const { currentUser, createReservation } = useAuth()
    const [searchinput, setSearchinput] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedParkingLot, setSelectedParkingLot] = useState(null);
    const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    const [enabled, setEnabled] = useState(true);

    const MakeReservationHandler = () => {
        setEnabled(false)
        createReservation(currentUser.uid, selectedParkingLot.id, selectedParkingSpot.name, start, end)
            .then(setReservation)
            .then(() => setEnabled(true));
    }

    return (
        <>
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

            {/* Parking Space */}
            <div className="collection-cont">
                <h3 className="collection-header">Parking Location</h3>
                <ParkingLotsList filter={searchinput} onSelect={setSelectedParkingLot} />
            </div>

            {/* Parking Spot */}
            {selectedParkingLot && <div className="collection-cont">
                <h3 className="collection-header">Parking Spot</h3>
                <ParkingSpotList parkingSpots={selectedParkingLot.lots} onSelect={setSelectedParkingSpot} />
            </div>}

            {selectedParkingSpot && <div className="collection-cont">
                <h3 className="collection-header">Duration</h3>
                <ParkingTimeSlot onStartChange={setStart} onEndChange={setEnd} />
            </div>}

            <button onClick={MakeReservationHandler} className="transaction-btn" disabled={!enabled || !selectedParkingLot || !selectedVehicle || !selectedParkingSpot}>
                Reserve Now
            </button>
        </>
    )
}

export default Reservation