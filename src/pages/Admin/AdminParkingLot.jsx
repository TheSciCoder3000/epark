import { useState } from 'react';
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/AdminParkingLot.css"; // Import CSS file
import { createParkingSpots } from '../../api/Firestore';
import { useAuth } from '../../components/contexts/useAuth';

const AdminParkingLot = () => {
    const { currentUser } = useAuth();
    const [parkingSpotName, setParkingSpotName] = useState(null);
    const [parkingSpotType, ParkingSpotType] = useState(null);

    // Example parking slots (true = occupied, false = available)
    const parkingSlots = [
        { id: 1, occupied: false },
        { id: 2, occupied: true },
        { id: 3, occupied: false },
        { id: 4, occupied: true },
        { id: 5, occupied: false },
        { id: 6, occupied: false },
        { id: 7, occupied: true },
        { id: 8, occupied: false }
    ];

    // Example Parking Log Data
    const [parkingLog, setParkingLog] = useState([
        { client: "John Doe", plate: "XYZ 123", parkingSlot: 2, reservedHours: 4, hoursLeft: 2 },
        { client: "Jane Smith", plate: "ABC 789", parkingSlot: 4, reservedHours: 3, hoursLeft: 1 },
        { client: "Alice Brown", plate: "DEF 456", parkingSlot: 7, reservedHours: 5, hoursLeft: 3 },
    ]);

    const onAddParkingLot = () => {
        createParkingSpots(currentUser.uid, { name: parkingSpotName, type: parkingSpotType });
    }

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            <h1>Parking Lot</h1>

            {/* Parking Lot Layout */}
            <div className="parking-lot">
                <div className="parking-row">
                    {parkingSlots.slice(0, 4).map((slot) => (
                        <div key={slot.id} className={`parking-slot ${slot.occupied ? 'occupied' : 'available'}`}>
                            <span>Slot {slot.id}</span>
                        </div>
                    ))}
                </div>

                <div className="road-lane">Lane</div>

                <div className="parking-row">
                    {parkingSlots.slice(4, 8).map((slot) => (
                        <div key={slot.id} className={`parking-slot ${slot.occupied ? 'occupied' : 'available'}`}>
                            <span>Slot {slot.id}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Parking Log Table */}
            <div className="parking-lots-cont">
                <h2 className='header'>Parking Log</h2>
                <div className="parking-controls-cont">
                    <button onClick={onAddParkingLot} className="add-parking-btn">+</button>
                </div>
                <div className="parking-log-container">
                    <table className="parking-log">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Plate Number</th>
                                <th>Parking Slot</th>
                                <th>Reserved Hours</th>
                                <th>Hours Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkingLog.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.client}</td>
                                    <td>{log.plate}</td>
                                    <td>Slot {log.parkingSlot}</td>
                                    <td>{log.reservedHours} hrs</td>
                                    <td>{log.hoursLeft} hrs</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminParkingLot;
