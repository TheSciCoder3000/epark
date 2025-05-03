import "../../assets/styles/css/AdminParkingLot.css";
import { useEffect, useState } from "react";
import Bkg from "../../assets/img/dash-bkg.png";
import { createParkingSpots, deleteParkingSpot } from "../../api/Firestore";
import { useAuth } from "../../components/contexts/Auth/hooks";
import ParkingLotImgForm from "../../components/ParkingLotImgForm";

const AdminParkingLot = () => {
    const { currentUser, UpdateParkingLot } = useAuth();
    const [parkingLog, setParkingLog] = useState(currentUser.lots);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLog, setNewLog] = useState({ name: "", type: "", price: 0 });
    const [adding, setAdding] = useState(false);

    useEffect(() => {}, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        setNewLog({ ...newLog, [e.target.name]: e.target.value });
    };

    const addParkingLog = () => {
        setAdding(true);
        if (parkingLog.find((lot) => lot.name === newLog.name)) {
            setAdding(false);
            return;
        }

        createParkingSpots(currentUser.uid, {
            name: newLog.name,
            type: newLog.type,
            price: parseFloat(newLog.price),
        }).then(() => {
            setParkingLog([...parkingLog, newLog]);
            UpdateParkingLot([...parkingLog, newLog]);
            setNewLog({ name: "", type: "", price: 0 });
            toggleModal();
            setAdding(false);
        });
    };

    const deleteParkingLog = (index) => {
        deleteParkingSpot(currentUser.uid, parkingLog[index].id).then(() => {
            const updatedParkingLog = parkingLog.filter((_, i) => i !== index);
            setParkingLog(updatedParkingLog);
            UpdateParkingLot(updatedParkingLog);
        });
    };

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            {/* Parking Log List */}
            <div className="parking-lots-cont">
                <h2 className="header">Parking Lot</h2>

                <ParkingLotImgForm />

                <div className="parking-controls-cont">
                    <button onClick={toggleModal} className="add-parking-btn">
                        +
                    </button>
                </div>
                <div className="parking-log-container">
                    <ul className="parking-log-list">
                        {parkingLog?.map((log, index) => (
                            <li key={index} className="parking-log-item">
                                Slot: {log.name}
                                <br />
                                Type: {log.type}
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteParkingLog(index)}
                                >
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
                    <div
                        className="modal-drawer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ color: "white" }}>Add Parking Log</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Parking Slot Number"
                            value={newLog.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="type"
                            placeholder="Vehicle Type"
                            value={newLog.type}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price per hour"
                            value={newLog.price}
                            onChange={handleInputChange}
                        />
                        <button
                            disabled={adding}
                            className="add-btn"
                            onClick={addParkingLog}
                        >
                            Add Log
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminParkingLot;
