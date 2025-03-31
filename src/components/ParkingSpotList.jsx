import { useEffect, useState } from "react";

function ParkingSpotList({ parkingSpots, onSelect }) {
    const [LotSelected, setLotSelected] = useState(null);
    useEffect(() => onSelect && onSelect(LotSelected), [LotSelected, onSelect]);

    return (
        <div className="parking-spot-cont">
            {parkingSpots.map((data, index) => (
                <div key={index} className={`spot-item${LotSelected?.name === data.name ? " selected" : ""}`} onClick={() => setLotSelected(data)}>
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