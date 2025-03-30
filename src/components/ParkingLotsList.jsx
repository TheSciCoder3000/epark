import { useEffect, useState } from "react";

const HistoryData = [
  {
    id: 1,
    location: "De La Salle University - Dasmarinas",
    distance: "0.5 km",
  },
  {
    id: 2,
    location: "Statefields School Inc.",
    distance: "3 km",
  },
  {
    id: 3,
    location: "Ateneo de Manila University",
    distance: "20 km",
  },
]

function ParkingLotsList({ filter, onSelect }) {
  const [LotSelected, setLotSelected] = useState(null);
  const FilterPattern = (word) => {
    const pattern = new RegExp(filter, "i");
    return pattern.test(word);
  }

  useEffect(() => onSelect && onSelect(LotSelected), [LotSelected, onSelect]);

  return (
    <div className="parking-history-cont">
      {HistoryData.filter(item => FilterPattern(item.location)).map((data, index) => (
        <div key={index} className={`history-card${LotSelected?.id === data.id ? " selected" : ""}`} onClick={() => setLotSelected(data)}>
          <div className="history-content">
            <h4>{data.location}</h4>
            <p>{data.distance}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ParkingLotsList