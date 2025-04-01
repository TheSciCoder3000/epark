import "../../assets/styles/css/AdminParkingLot.css";
import { useEffect, useState } from 'react';
import Bkg from "../../assets/img/dash-bkg.png";
import { createParkingSpots } from '../../api/Firestore';
import { useAuth } from '../../components/contexts/Auth/hooks';

const AdminParkingLot = () => {
    const { currentUser } = useAuth();
    const [parkingLog, setParkingLog] = useState(currentUser.lots.map(item => ({
        parkingSlot: item.name,
        vehicleType: item.type,
        price: item.price
    })));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLog, setNewLog] = useState({ parkingSlot: "", vehicleType: "", price: 0 });

    useEffect(() => {

    }, [])

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        setNewLog({ ...newLog, [e.target.name]: e.target.value });
    };

    const addParkingLog = () => {
        createParkingSpots(currentUser.uid, {
            name: newLog.parkingSlot,
            type: newLog.vehicleType,
            price: parseFloat(newLog.price)
        })
            .then(() => {
                console.log([...parkingLog, newLog])
                setParkingLog([...parkingLog, newLog]);
                setNewLog({ parkingSlot: "", vehicleType: "", price: 0 });
                toggleModal();
            });
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
                        {parkingLog?.map((log, index) => (
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
                        <input type="text" name="parkingSlot" placeholder="Parking Slot Number" value={newLog.parkingSlot} onChange={handleInputChange} />
                        <input type="text" name="vehicleType" placeholder="Vehicle Type" value={newLog.vehicleType} onChange={handleInputChange} />
                        <input type="number" name="price" placeholder="Price per hour" value={newLog.price} onChange={handleInputChange} />
                        <button onClick={addParkingLog}>Add Log</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminParkingLot;
