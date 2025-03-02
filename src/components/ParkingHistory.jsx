const HistoryData = [
  {
    location: "De La Salle University - Dasmarinas",
    distance: "0.5 km",
  },
  {
    location: "Statefields School Inc.",
    distance: "3 km",
  },
  {
    location: "Ateneo de Manila University",
    distance: "20 km",
  },
]

function ParkingHistory() {
  return (
    <div className="parking-history-cont">
      {HistoryData.map((data, index) => (
        <div key={index} className="history-card">
          <div className="history-content">
            <h4>{data.location}</h4>
            <p>{data.distance}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ParkingHistory