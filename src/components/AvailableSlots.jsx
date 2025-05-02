import "../assets/styles/css/AvailableSlot.css";

const AvailableSlots = ({ totalSlots, parkedCars, reservedSlots }) => {
    const usedSlots = parkedCars + reservedSlots; // Combine reserved and parked
    const availableSlots = totalSlots - usedSlots; // Recalculate available slots
    const percentage = (usedSlots / totalSlots) * 100; // Update progress bar

    return (
        <div className="card available-slot">
            <div className="slot-info">
                <span className="number">{availableSlots}</span>
            </div>
            <div className="progress-bar">
                <div className="fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <h2>Available Slots</h2>
        </div>
    );
};

export default AvailableSlots;
