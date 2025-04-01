import "../assets/styles/css/ParkingLog.css";
import { useState } from "react";

const ParkingLog = ({ logs }) => {
    const [adminLogs, setAdminLogs] = useState(logs || []);

    return (
        <div className="admin-parking-log-cont">
            <ul className="admin-parking-log-list">
                {adminLogs.length > 0 ? (
                    adminLogs.map((log, index) => (
                        <li key={index} className="admin-parking-log-item">
                            <div><strong>Client:</strong> {log.client}</div>
                            <div><strong>Plate Number:</strong> {log.plate}</div>
                            <div><strong>Parking Spot:</strong> {log.ParkingSpot}</div>
                            <div><strong>Reserved Hours:</strong> {log.reservedHours} Hrs</div>
                            <div><strong>Hours Left:</strong> {log.hoursLeft} Hrs</div>
                        </li>
                    ))
                ) : (
                    <li className="admin-no-records">No parking records available</li>
                )}
            </ul>
        </div>
    );
};

export default ParkingLog;
