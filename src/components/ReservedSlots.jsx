import React from "react";
import "../assets/styles/css/ReservedSlot.css";

const ReservedSlots = ({ reservedSlots = 0, parkedCars = 0 }) => {
    // Calculate total used slots (reserved + parked)
    const totalUsedSlots = Math.max(reservedSlots + parkedCars, 0);

    return (
        <div className="card reserved-slot">
            <h4>Reserved & Parked Slots</h4>
            <div className="slot-info">
                <span className="number">{totalUsedSlots}</span>
                <span className="label"> Slots reserved/parked</span>
            </div>
        </div>
    );
};

export default ReservedSlots;
