import { useState, useEffect } from "react"

const VehicleTypes = [
  {
    name: "Motorcycle"
  },
  {
    name: "Car"
  },
  {
    name: "Truck"
  },
]

function VehicleSelection({ onSelect }) {
  const [vehicleSelected, setVehicleSelected] = useState(null);

  useEffect(() => onSelect && onSelect(vehicleSelected), [vehicleSelected, onSelect]);

  return (
    <div className="vehicle-type-cont">
      {VehicleTypes.map((type, index) => (
        <div className={`vehicle-type${vehicleSelected === type.name ? " selected" : ""}`}
          key={index}
          onClick={() => setVehicleSelected(type.name)}>
          <img src="" alt={`${type.name}-img`} />
          <h4>{type.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default VehicleSelection