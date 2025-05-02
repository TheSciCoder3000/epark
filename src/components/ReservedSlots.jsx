import "../assets/styles/css/ReservedSlot.css";

const ReservedSlots = ({ reservedSlots = 0, parkedCars = 0 }) => {
    // Calculate total used slots (reserved + parked)
    const totalUsedSlots = Math.max(reservedSlots + parkedCars, 0);

    return (
        <div className="card reserved-slot">
            <div className="slot-info">
                <h2 className="number">{totalUsedSlots}</h2>
            </div>
            <h4 className="label">Reserved/Parked</h4>
        </div>
    );
};

export default ReservedSlots;
