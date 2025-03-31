import "../../assets/styles/css/AdminParkingLot.css";
import { useState } from 'react';
import Bkg from "../../assets/img/dash-bkg.png";
import { createParkingSpots } from '../../api/Firestore';
import { useAuth } from '../../components/contexts/useAuth';

const AdminParkingLot = () => {
    const { currentUser } = useAuth();
    const [parkingLog, setParkingLog] = useState([
        { parkingSlot: 2, vehicleType: "Sedan" },
        { parkingSlot: 4, vehicleType: "SUV" },
        { parkingSlot: 7, vehicleType: "Truck" },
        { parkingSlot: 9, vehicleType: "Motorcycle" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLog, setNewLog] = useState({ parkingSlot: "", vehicleType: "" });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        setNewLog({ ...newLog, [e.target.name]: e.target.value });
    };

    const addParkingLog = () => {
        setParkingLog([...parkingLog, newLog]);
        setNewLog({ parkingSlot: "", vehicleType: "" });
        toggleModal();
    };

    const deleteParkingLog = (index) => {
        const updatedParkingLog = parkingLog.filter((_, i) => i !== index);
        setParkingLog(updatedParkingLog);
    };

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            {/* Parking Log List */}
            <div className="parking-lots-cont">
                <h2 className="header">Parking Log</h2>
                <div className="parking-controls-cont">
                    <button onClick={toggleModal} className="add-parking-btn">+</button>
                </div>
                <div className="parking-log-container">
                    <ul className="parking-log-list">
                        {parkingLog.map((log, index) => (
                            <li key={index} className="parking-log-item">
                                Slot: {log.parkingSlot}
                                <br />
                                Type: {log.vehicleType}
                                <button className="delete-btn" onClick={() => deleteParkingLog(index)}>
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Drawer Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-drawer" onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ color: "white" }}>Add Parking Log</h3>
                        <input type="number" name="parkingSlot" placeholder="Parking Slot Number" value={newLog.parkingSlot} onChange={handleInputChange} />
                        <input type="text" name="vehicleType" placeholder="Vehicle Type" value={newLog.vehicleType} onChange={handleInputChange} />
                        <button onClick={addParkingLog}>Add Log</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminParkingLot;
