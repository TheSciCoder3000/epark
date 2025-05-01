import { useEffect, useState } from "react";

function ParkingSpotList({ parkingSpots, onSelect, vehicleType }) {
    const [LotSelected, setLotSelected] = useState(null);
    useEffect(() => onSelect && onSelect(LotSelected), [LotSelected, onSelect]);

    return (
        <div className="parking-spot-cont">
            {parkingSpots.filter(spot => spot.type == vehicleType).map((data, index) => (
                <div key={index} className={`spot-item${LotSelected?.name === data.name ? " selected" : ""}`} onClick={() => setLotSelected(data)}>
                    <h4>{data.name}</h4>
                </div>
            ))}
        </div>
    )
}

export default ParkingSpotList