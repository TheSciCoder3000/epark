import React from "react";
import "../assets/styles/css/ParkingLog.css";

const ParkingLog = ({ logs }) => {
    return (
        <div className="parking-log">
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Car Plate Number</th>
                        <th>Parking Spot</th>
                        <th>Reserved Hours</th>
                        <th>Hours Left</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length > 0 ? (
                        logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.client}</td>
                                <td>{log.plate}</td>
                                <td>{log.ParkingSpot}</td>
                                <td>{log.reservedHours} Hrs</td>
                                <td>{log.hoursLeft} Hrs </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No parking records available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ParkingLog;