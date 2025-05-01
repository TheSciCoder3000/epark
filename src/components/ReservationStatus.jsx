import { useNavigate } from "react-router-dom"
import "../assets/styles/css/ReservationStatus.css"
import { useReservation } from "./contexts/Reservation/hooks";

function ReservationStatus() {
    const { reservation, updateReservationStatus } = useReservation();
    const navigate = useNavigate();
    const onUpdateReservation = async () => {
        if (reservation.status == "occupied") {
            navigate("/Transaction")
        } else updateReservationStatus(reservation.id, reservation.status == "reserved" ? "occupied" : "finished")
    }

    return (
        <div className={`reservation-status-cont ${reservation.status}`}>
            <div className={`reservation-indicator ${reservation.status}`}>
                <h2 className='parking-name'>{reservation.parkingLot.parkingName}</h2>
                <div className="detail-row">
                    <h4 className="detail-header">Location:</h4>
                    <h4 className="parking-location">{reservation.parkingLot.location}</h4>
                </div>
                <div className="detail-row">
                    <h4 className="detail-header">Parking Slot:</h4>
                    <p className="parking-slot">{reservation.parkingSpotId}</p>
                </div>
                <div className="detail-row">
                    <h4 className="detail-header">Price:</h4>
                    <p className="parking-slot">{reservation.price}/hr</p>
                </div>

                <button className="reservation-control" onClick={onUpdateReservation}>
                    {reservation.status == "reserved" ? "Occupy" : "Pay"}
                </button>
            </div>
        </div>
    )
}

export default ReservationStatus