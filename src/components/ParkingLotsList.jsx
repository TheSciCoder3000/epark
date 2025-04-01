import { useEffect, useState } from "react";
import { getParkingLots } from "../api/Firestore";


function ParkingLotsList({ filter, onSelect }) {
  const [parkingLots, setParkingLots] = useState([]);
  const [LotSelected, setLotSelected] = useState(null);
  const FilterPattern = (word) => {
    const pattern = new RegExp(filter, "i");
    return pattern.test(word);
  }

  useEffect(() => { getParkingLots().then(setParkingLots) }, [])

  useEffect(() => onSelect && onSelect(LotSelected), [LotSelected, onSelect]);

  return (
    <div className="parking-history-cont">
      {parkingLots.filter(item => FilterPattern(item.parkingName)).map((data, index) => (
        <div key={index} className={`history-card${LotSelected?.id === data.id ? " selected" : ""}`} onClick={() => setLotSelected(data)}>
          <div className="history-content">
            <h4>{data.parkingName}</h4>
            <p>{data.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ParkingLotsList