import React, { useState, useEffect } from "react";
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/AdminHistory.css";

const AdminHistory = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Sample Data
    const historyData = [
        { reservationID: 101, client: "John Doe", plateNumber: "XYZ 123", carModel: "Toyota Corolla", amount: 150, paid: true, reservedHours: 4, date: "2025-03-30" },
        { reservationID: 102, client: "Jane Smith", plateNumber: "ABC 789", carModel: "Honda Civic", amount: 120, paid: false, reservedHours: 3, date: "2025-03-29" },
        { reservationID: 103, client: "Alice Brown", plateNumber: "DEF 456", carModel: "Ford Focus", amount: 200, paid: true, reservedHours: 5, date: "2025-03-28" },
    ];

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            <h1 className="history-title">Admin History</h1>

            {/* Scrollable Table Container */}
            <div className="history-container">
                <table className="history-table">
                    {!isMobile && (
                        <thead>
                            <tr>
                                <th>Reservation ID</th>
                                <th>Client Name</th>
                                <th>Plate Number</th>
                                <th>Car Model</th>
                                <th>Amount ($)</th>
                                <th>Paid</th>
                                <th>Reserved Hours</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {historyData.map((record, index) => (
                            isMobile ? (
                                // Mobile View: Card Format
                                <tr key={index} className="mobile-card">
                                    <td colSpan="8">
                                        <div className="card-content">
                                            <p><strong>Reservation ID:</strong> {record.reservationID}</p>
                                            <p><strong>Client Name:</strong> {record.client}</p>
                                            <p><strong>Plate Number:</strong> {record.plateNumber}</p>
                                            <p><strong>Car Model:</strong> {record.carModel}</p>
                                            <p><strong>Amount:</strong> ${record.amount.toFixed(2)}</p>
                                            <p><strong>Paid:</strong> <span className={record.paid ? "paid" : "unpaid"}>{record.paid ? "Yes" : "No"}</span></p>
                                            <p><strong>Reserved Hours:</strong> {record.reservedHours} hrs</p>
                                            <p><strong>Date:</strong> {record.date}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                // Desktop View: Standard Table Row
                                <tr key={index}>
                                    <td>{record.reservationID}</td>
                                    <td>{record.client}</td>
                                    <td>{record.plateNumber}</td>
                                    <td>{record.carModel}</td>
                                    <td>${record.amount.toFixed(2)}</td>
                                    <td className={record.paid ? "paid" : "unpaid"}>
                                        {record.paid ? "Yes" : "No"}
                                    </td>
                                    <td>{record.reservedHours} hrs</td>
                                    <td>{record.date}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHistory;
