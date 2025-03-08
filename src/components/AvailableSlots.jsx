import React from "react";
import "../assets/styles/css/AvailableSlot.css";

const AvailableSlots = ({ totalSlots, parkedCars, reservedSlots }) => {
    const usedSlots = parkedCars + reservedSlots; // Combine reserved and parked
    const availableSlots = totalSlots - usedSlots; // Recalculate available slots
    const percentage = (usedSlots / totalSlots) * 100; // Update progress bar

    return (
        <div className="card available-slot">
            <h4>Available Slots</h4>
            <div className="slot-info">
                <span className="number">{availableSlots}</span>
                <span className="label"> Slots available</span>
            </div>
            <div className="progress-bar">
                <div className="fill" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default AvailableSlots;