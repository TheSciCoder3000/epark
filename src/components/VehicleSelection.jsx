import { useState, useEffect } from "react"
import MotorImg from "../assets/img/motor.jpg";
import CarImg from "../assets/img/car.jpg";

const VehicleTypes = [
  {
    name: "Motorcycle",
    src: MotorImg
  },
  {
    name: "Car",
    src: CarImg
  },
  {
    name: "Truck",
    src: null
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
          <img src={type.src} alt={`${type.name}-img`} />
          <h4>{type.name}</h4>
          <div className="filter" />
        </div>
      ))}
    </div>
  )
}

export default VehicleSelection