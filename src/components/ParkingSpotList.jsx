import { useEffect, useState } from "react";

function ParkingSpotList({ parkingSpots, onSelect }) {
    const [LotSelected, setLotSelected] = useState(null);
    useEffect(() => onSelect && onSelect(LotSelected), [LotSelected, onSelect]);

    return (
        <div className="parking-history-cont">
            {parkingSpots.map((data, index) => (
                <div key={index} className={`history-card${LotSelected?.id === data.id ? " selected" : ""}`} onClick={() => setLotSelected(data)}>
                    <div className="history-content">
                        <h4>{data.name}</h4>
                        <p>{data.location}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ParkingSpotList